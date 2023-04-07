import { React, useEffect, useRef, useState } from 'react';
import { getDatabase, ref, set, update } from 'firebase/database'

import { useDispatch, useSelector } from 'react-redux';
import { taskDataSelector, taskData } from '../../store/taskSlice';

import { firebaseApp } from '../../database/firebase'

import { ReactComponent as PlusIcon } from '../../assets/plus-solid.svg'
import { ReactComponent as CheckIcon } from '../../assets/check-solid.svg'

import Input from '../Input/Input';

import s from './Form.module.css';



const Form = () => {
  const uid = localStorage.getItem('todoUid');
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState(undefined);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const taskItem = useSelector(taskDataSelector);
  const dispatch = useDispatch();
  const refForm = useRef(null);
  const db = getDatabase(firebaseApp);


  useEffect(() => {
    if (taskItem !== null) {
      setEdit(taskItem.isEdit);
      setID(taskItem.id);
      setTitle(taskItem.title);
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

    if (edit) {
      update(ref(db, `/${uid}/${taskItem.id}`), taskItem);
    } else {
      set(ref(db, `/${uid}/${taskItem.id}`), taskItem);
    };

    setEdit(false);
    setID(undefined);
    setTitle('');
    setDate('');

    refForm.current.reset();
  }

  return (
    <div className={s.root}>
      <form
        ref={refForm}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className={s.inputWrap}>
          <Input
            type="text"
            name="title"
            placeholder="Введите заголовок"
            defaultValue={title}
          />
          <Input
            type="date"
            name="date"
            defaultValue={date}
          />
        </div>
        <button type="submit" >{edit ? <CheckIcon /> : <PlusIcon />}</button>
      </form>
    </div>
  );
};


export default Form;
