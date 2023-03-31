import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../taskServices/taskApi";
import taskSlice from "./taskSlice";

const store = configureStore({
  reducer: {
    task: taskSlice,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(taskApi.middleware)
})


export default store;
