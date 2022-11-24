import { useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';

import s from './Form.module.css';


const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => resolve(event.target.result));
    reader.addEventListener('error', (error) => reject(error));
    reader.readAsDataURL(file);
  })
}

const Form = ({ myList }) => {
  const [todoItem, setTodoItem] = useState({});
  const [taskFile, setTaskFile] = useState({});
  const ref = useRef(null);

  const convertFile = (userFile) => {
    const taskFile = userFile;

    for (const file of taskFile) {

      getBase64(file).then((fileAsBase64) => {
        console.log('file64', file);

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

    if (e.target.name === 'file') {
      convertFile(e.target.files)
    } else {
      setTodoItem(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

  }


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('state >>> ', todoItem);
    console.log('file >>> ', taskFile);

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
          />
        </label>
        <label htmlFor="description">
          <textarea className={s.descr} name="description" rows="5"></textarea>
        </label>
        <label htmlFor="taget-date">
          <Input
            type="date"
            name="date"
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

export default Form;
