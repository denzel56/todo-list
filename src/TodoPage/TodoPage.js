import { useEffect, useState } from 'react';
import Form from '../Form/Form';

import s from './TodoPage.module.css';

const TodoPage = () => {
  const [list, setList] = useState(null);

  useEffect(() => {
    console.log('page', list);
  }, [list])

  const handleList = (itemList, itemFile) => {
    setList(prevState => ({
      ...prevState,
      [itemList.title]: {
        title: itemList.title,
        description: itemList.description,
        date: itemList.date,
        file: itemFile
      }
    }))
  }

  return (
    <div className={s.root}>
      <h1>ToDo List</h1>
      <Form myList={handleList} />
      <div className={s.listContainer}>
        <ul className={s.todoList}>
          {
            list !== null ?
              Object.entries(list).map(([key, value], index) => (
                <li
                  key={key}
                  className={s.todoListItem}
                >
                  <div className={s.imageWrap}>
                    {value.file.type !== '' && <img src={value.file.fileUrl} alt={key} />}
                  </div>
                  <div className={s.descrWrap}>
                    <h3 className={s.todoItemtemTitle}>{value.title}</h3>
                    <p className={s.todoItemDescr}>{value.description}</p>
                    <span className={s.todoItemDate}>Дата окончания: {value.date}</span>
                  </div>
                  <div className={s.resultButtonsWrap}></div>
                </li>
              )) : null
          }
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;
