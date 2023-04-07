import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line
import taskSlice from "./taskSlice";

const store = configureStore({
  reducer: {
    task: taskSlice,
  },
})


export default store;
