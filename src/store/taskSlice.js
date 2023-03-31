import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoItem: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    taskData: (state, action) => {
      // eslint-disable-next-line
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
