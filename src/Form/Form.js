import { useContext, useRef, useState } from 'react';
import Input from '../Input/Input';

import { TodoContext } from '../Context/todoContext';
import s from './Form.module.css';

const Form = () => {
  const [todoItem, setTodoItem] = useState({});
  const ref = useRef(null);
  const todoList = useContext(TodoContext);

  const handleChangeForm = (e) => {
    console.log(e.target.value);
    setTodoItem(prevState => ({
      ...prevState,
      [e.target.name]: e.target.name === 'file' ? e.target.files : e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('state >>> ', todoItem);
    console.log('context >>> ', todoItem.file);

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
          />
        </label>
        <label htmlFor="description">
          <textarea className={s.descr} name="description" rows="5"></textarea>
        </label>
        <label htmlFor="taget-date">
          <Input
            type="date"
            name="taget-date"
          />
        </label>
        <label htmlFor="file">
          <Input
            type="file"
            name="file"
          />
        </label>
        <button type="submit">Добавить задачу</button>
      </form>
    </div>
  );
};

export default Form;
