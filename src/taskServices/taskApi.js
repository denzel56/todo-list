import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDatabase, ref, get, child, set } from 'firebase/database';
import { firebaseApp } from '../database/firebase';

const db = getDatabase(firebaseApp);
const uid = localStorage.getItem('todoUid')

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['Tasks'],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    fetchAllTasks: build.query({
      async queryFn() {
        const dbRef = ref(db);
        const result = [];

        await get(child(dbRef, `/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const tasks = snapshot.val();

            Object.values(tasks).map((item) => {
              result.push(item);

              return item
            })
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
          return { data: result }
      },
      // eslint-disable-next-line
      providesTags: result => ['Tasks']
    }),
    createTask: build.mutation({
      // query: (uid,body) => ({
      //   url: `/${uid}`,
      //   method: 'POST',
      //   body
      // }),
      queryFn(task) {
        console.log(uid);
        console.log(task);
        const dbRef = ref(db, `/${uid}/${task.id}`);
        set(dbRef, task);
      },
      invalidatesTags: ['Tasks']
    }),
    updateTask: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/${uid}/${id}`,
        method: 'PATCH',
        body: rest
      }),
      invalidatesTags: ['Tasks']
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `/${uid}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks']
    })
  })
})

export const { useFetchAllTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;
