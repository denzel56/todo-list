import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';

import { useDispatch, useSelector } from 'react-redux';
import { taskDataSelector, taskData } from '../../store/taskSlice';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../taskServices/taskApi';

import s from './Form.module.css';

/**
 * Функция конвертирует файл в формат base64
 * @param { object } file Файл загруженный пользователем
 * @returns promise резулльтат конвертирования файла
 */
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => resolve(event.target.result));
    reader.addEventListener('error', (error) => reject(error));
    reader.readAsDataURL(file);
  })
}

/**
 * Компонент формы.
 * @param { id } id Id записи для редактирования
 * @param { title } title Заголовок записи для редактирования
 * @param { date } date Дата окончания записи для редактирования
 * @returns возвращает форму
 */

// isEdit, id, title, date
const Form = ({ }) => {
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState(undefined);
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [date, setDate] = useState('');
  const [create] = useCreateTaskMutation();
  const [update] = useUpdateTaskMutation();
  const taskItem = useSelector(taskDataSelector);
  const dispatch = useDispatch();
  const ref = useRef(null);



  useEffect(() => {
    if (taskItem !== null) {
      setEdit(taskItem.isEdit);
      setID(taskItem.id);
      setTitle(taskItem.title);
      setDescr(taskItem.description);
      setDate(taskItem.date);
    }
  }, [taskItem]);

  /**
   * Функция вызывает конвертироввание файла и запивывает результат в стейт
   * @param { object } userFile Файл полученный в форме
   */
  const convertFile = (userFile) => {
    const taskFile = userFile;

    for (const file of taskFile) {

      getBase64(file).then((fileAsBase64) => {

        dispatch(taskData({
          'fileName': file.name,
          'fileType': file.type,
          'fileUrl': fileAsBase64
        }))

      }).catch((err) => {
        console.log('error >>>', err);
      });
    }

  }

  const handleChange = (e) => {

    if (e.target.name === 'file') {
      convertFile(e.target.files);
    } else {
      dispatch(taskData({ [e.target.name]: e.target.value }));
    }

    dispatch(taskData({
      'id': edit ? id : Date.now(),
      'isDone': false,
      'isMiss': false
    }));
  }

  /**
   * При отправлении формы проверяет указанную пользователем дату. Передает данные в компонент TodoPage.
   * И очищает форму.
   * @param { object } e Объект события отправки формы.
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('form render', taskItem);

    setTimeout(() => {
      edit ? update(taskItem) : create(taskItem);
    }, 1000)

    setEdit(false);
    setID(undefined);
    setTitle('');
    setDescr('');
    setDate('');

    ref.current.reset();
  }

  return (
    <div className={s.root}>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="title">
          <Input
            type="text"
            name="title"
            placeholder="Введите заголовок"
            defaultValue={title}
          />
        </label>
        <label htmlFor="description">
          <textarea
            className={s.descr}
            name="description"
            rows="5"
            placeholder='Введите описание'
            defaultValue={descr}
          ></textarea>
        </label>
        <label htmlFor="taget-date">
          <Input
            type="date"
            name="date"
            defaultValue={date}
          />
        </label>
        <label htmlFor="file">
          <Input
            type="file"
            name="file"
          />
        </label>
        <button type="submit" >{edit ? 'Обновить задачу' : 'Добавить задачу'}</button>
      </form>
    </div>
  );
};

Form.propTypes = {
  /**
   * Функция
   */
  myList: PropTypes.func,
  /**
   * Id записи
   */
  id: PropTypes.number,
  /**
   * Заголовок записи
   */
  title: PropTypes.string,
  /**
   * Дата окончания задачи
   */
  date: PropTypes.string
}

export default Form;
