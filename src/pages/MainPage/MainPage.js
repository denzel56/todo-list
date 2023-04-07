import { React, useEffect, useState} from 'react';
import { getDatabase, ref, onValue, child, get, update } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { firebaseApp } from '../../database/firebase';


import { taskData } from '../../store/taskSlice';

import { ReactComponent as Spinner } from '../../assets/spinner-solid.svg'

import Form from '../../components/Form';
import Task from '../../components/Task';

import s from './MainPage.module.css';


const MainPage = () => {
  const uid = localStorage.getItem('todoUid');
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);

  const day = new Date().getDate();
  const month = (new Date().getMonth() + 1);
  const year = new Date().getFullYear();
  const now = new Date([year, month, day]);

  const db = getDatabase(firebaseApp);


  useEffect(() => {
    const dbRef = ref(db);

    setLoading(true);

    get(child(dbRef, `/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        // eslint-disable-next-line
        console.log("No data available");
      }
    }).catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });

    setLoading(false);
     // eslint-disable-next-line
  }, [uid])

  useEffect(() => {
    const userTasksRef = ref(db, `/${uid}`);

    onValue(userTasksRef, (snapshot) => {
      const tasks = snapshot.val();
      setData(tasks);
    });
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    if (data) {
      Object.values(data).map((item) => {
        if (now.getTime() === new Date(item.date.split('-')).getTime()) {
          update(ref(db, `/${uid}/${item.id}`), {
            ...item,
            'isWarning': true
          });
        }

        if (now > new Date(item.date.split('-'))) {
          update(ref(db, `/${uid}/${item.id}`), {
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
    Object.values(data).map((item) => {
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
          data && Object.values(data).map((item) => (
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
