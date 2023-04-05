import { React, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { taskData } from '../../store/taskSlice';
import { useFetchAllTasksQuery, useUpdateTaskMutation } from '../../taskServices/taskApi';

// import app from '../../database/firebase';

import { ReactComponent as Spinner } from '../../assets/spinner-solid.svg'

import Form from '../../components/Form';
import Task from '../../components/Task';

import s from './MainPage.module.css';


const MainPage = () => {
  const uid = localStorage.getItem('todoUid');
  const { data, isLoading } = useFetchAllTasksQuery();
  const dispatch = useDispatch();
  const [update] = useUpdateTaskMutation();

  const day = new Date().getDate();
  const month = (new Date().getMonth() + 1);
  const year = new Date().getFullYear();
  const now = new Date([year, month, day]);


  useEffect(() => {
    if (data) {
      data.map((item) => {
        if (now.getTime() === new Date(item.date.split('-')).getTime()) {
          update(uid, {
            ...item,
            'isWarning': true
          });
        }

        if (now > new Date(item.date.split('-'))) {
          update(uid, {
            ...item,
            'isWarning': false,
            'isMiss': true
          });
        }

        return item
    })
  }
  // eslint-disable-next-line
  }, [data])

  const handleEdit = (id) => {
    data.map((item) => {
      if (item.id === id) {
        dispatch(taskData({
          ...item,
          'isEdit': true
        }));
      }

      return item
    })
  }

  return (
    <div className={s.root}>
      <h1>ToDo List</h1>
      <Form
        isEdit
      />
      <div className={s.listContainer}>
        {isLoading && <div className={s.spinner}> <Spinner /> </div>}
        {
          data && data.map((item) => (
              <Task
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                date={item.date}
                fileUrl={item.fileUrl}
                fileName={item.fileName}
                isDone={item.isDone}
                isMiss={item.isMiss}
                isWarning={item.isWarning}
                onEdit={handleEdit}
              />
            )
          )
        }
      </div>
    </div>
  );
};

export default MainPage;
