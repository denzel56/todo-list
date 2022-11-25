import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';
import dayjs from 'dayjs';

import s from './Form.module.css';


const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => resolve(event.target.result));
    reader.addEventListener('error', (error) => reject(error));
    reader.readAsDataURL(file);
  })
}

const Form = ({ myList, id, title, date }) => {
  const [todoItem, setTodoItem] = useState({});
  const [taskFile, setTaskFile] = useState({});
  const ref = useRef(null);

  console.log('form start', id);

  const convertFile = (userFile) => {
    const taskFile = userFile;

    for (const file of taskFile) {

      getBase64(file).then((fileAsBase64) => {

        setTaskFile(prevState => ({
          ...prevState,
          name: file.name,
          type: file.type,
          fileUrl: fileAsBase64
        }))

      }).catch((err) => {
        console.log('error >>>', err);
      });
    }

  }

  const handleChangeForm = (e) => {
    console.log('form', id);

    if (e.target.name === 'file') {
      convertFile(e.target.files)
    } else {
      setTodoItem(prevState => ({
        ...prevState,
        id: id > 0 ? id : dayjs().unix(),
        [e.target.name]: e.target.value
      }))
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dayjs().$d > dayjs(todoItem.date)) {
      alert('Укажите дату больше сегодняшней')
      return;
    }

    myList && myList(todoItem, taskFile);

    ref.current.reset();
  }

  return (
    <div className={s.root}>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        onChange={handleChangeForm}
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
        <button type="submit" >Добавить задачу</button>
      </form>
    </div>
  );
};

Form.propTypes = {
  myList: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string,
  date: PropTypes.string
}

export default Form;
