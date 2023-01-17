import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (build) => ({
    fetchAllTasks: build.query({
      query: () => ({
        url: '/tasks',

      }),
      providesTags: result => ['Tasks']
    }),
    createTask: build.mutation({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Tasks']
    }),
    updateTask: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: rest
      }),
      invalidatesTags: ['Tasks']
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks']
    })
  })
})

export const { useFetchAllTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;
