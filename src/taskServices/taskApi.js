import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://todo-list-52bdd-default-rtdb.europe-west1.firebasedatabase.app/'
  }),
  endpoints: (build) => ({
    fetchAllTasks: build.query({
      query: (uid) => ({
        url: `/${uid}`,
      }),
      // eslint-disable-next-line
      providesTags: result => ['Tasks']
    }),
    createTask: build.mutation({
      query: (uid,body) => ({
        url: `/${uid}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Tasks']
    }),
    updateTask: build.mutation({
      query: ({uid, id, ...rest }) => ({
        url: `/${uid}/${id}`,
        method: 'PATCH',
        body: rest
      }),
      invalidatesTags: ['Tasks']
    }),
    deleteTask: build.mutation({
      query: (uid, id) => ({
        url: `/${uid}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks']
    })
  })
})

export const { useFetchAllTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;
