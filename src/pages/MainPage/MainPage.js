import { useEffect, useState } from 'react';
import cn from 'classnames';

import Form from '../../components/Form';
import Task from '../../components/Task';

import { useFetchAllTasksQuery, useUpdateTaskMutation } from '../../taskServices/taskApi';
import { useDispatch, useSelector } from 'react-redux';
import { taskData, taskDataSelector } from '../../store/taskSlice';

import { ReactComponent as Spinner } from '../../assets/spinner-solid.svg'

import s from './MainPage.module.css';


const MainPage = () => {
  const { data, error, isLoading } = useFetchAllTasksQuery();
  const dispatch = useDispatch();
  const taskItem = useSelector(taskDataSelector);
  const [update] = useUpdateTaskMutation();

  const day = new Date().getDate();
  const month = (new Date().getMonth() + 1);
  const year = new Date().getFullYear();
  const now = new Date([year, month, day]);


  useEffect(() => {
    data && data.map((item) => {
      if (now.getTime() === new Date(item.date.split('-')).getTime()) {
        update({
          ...item,
          'isWarning': true
        });
      }

      if (now > new Date(item.date.split('-'))) {
        update({
          ...item,
          'isMiss': true
        });
      }
    })
  }, [data])

  const handleEdit = (id) => {
    data.map((item) => {
      if (item.id === id) {
        dispatch(taskData({
          ...item,
          'isEdit': true
        }));
      }
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
          data && data.map((item, key) => {
            return (
              <Task
                key={key}
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
          })
        }
      </div>
    </div>
  );
};

export default MainPage;
