import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';

import { useDispatch, useSelector } from 'react-redux';
import { taskDataSelector, taskData } from '../../store/taskSlice';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../taskServices/taskApi';

import { ReactComponent as PlusIcon } from '../../assets/plus-solid.svg'
import { ReactComponent as CheckIcon } from '../../assets/check-solid.svg'

import s from './Form.module.css';


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

  const handleChange = (e) => {
    dispatch(taskData({ [e.target.name]: e.target.value }));

    dispatch(taskData({
      'id': edit ? id : Date.now(),
      'isDone': false,
      'isMiss': false,
      'isWarning': false
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('form render', taskItem);

    edit ? update(taskItem) : create(taskItem);

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
        <div className='inputWrap'>
        <label htmlFor="title">
          <Input
            type="text"
            name="title"
            placeholder="Введите заголовок"
            defaultValue={title}
          />
          </label>
        <label htmlFor="taget-date">
          <Input
            type="date"
            name="date"
            defaultValue={date}
          />
        </label>
        </div>
        <button type="submit" >{edit ? <CheckIcon /> : <PlusIcon />}</button>
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
