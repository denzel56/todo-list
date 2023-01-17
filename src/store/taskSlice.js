import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoItem: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    taskData: (state, action) => {
      state.todoItem = {
        ...state.todoItem,
        ...action.payload
      }
    }
  },
})

export const { taskData } = taskSlice.actions;

export const taskDataSelector = (state) => state.task.todoItem;

export default taskSlice.reducer;
