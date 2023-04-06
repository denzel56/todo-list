import { React, useEffect} from 'react';
// import { getDatabase, ref, onValue, child, get } from 'firebase/database';
import { useDispatch } from 'react-redux';
// import { firebaseApp } from '../../database/firebase';


import { taskData } from '../../store/taskSlice';
import { useFetchAllTasksQuery, useUpdateTaskMutation } from '../../taskServices/taskApi';

import { ReactComponent as Spinner } from '../../assets/spinner-solid.svg'

import Form from '../../components/Form';
import Task from '../../components/Task';

import s from './MainPage.module.css';


const MainPage = () => {
  const uid = localStorage.getItem('todoUid');
  const { data, isLoading } = useFetchAllTasksQuery(uid);
  const dispatch = useDispatch();
  const [update] = useUpdateTaskMutation();
  // const [data, setData] = useState({});

  const day = new Date().getDate();
  const month = (new Date().getMonth() + 1);
  const year = new Date().getFullYear();
  const now = new Date([year, month, day]);

  // const db = getDatabase(firebaseApp);


  // useEffect(() => {
  //   const dbRef = ref(db);

  //   get(child(dbRef, `/${uid}`)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //       setData(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }, [uid])

  // useEffect(() => {
  //   const userTasksRef = ref(db, `/${uid}`);

  //   onValue(userTasksRef, (snapshot) => {
  //     const tasks = snapshot.val();
  //     setData(tasks);
  //   });
  // }, [])


  useEffect(() => {
    console.log(data)
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
