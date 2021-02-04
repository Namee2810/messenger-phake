import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

// const rootReducer = {
//   todo: todoSlice
// }

const store = configureStore({
  reducer: slice
});

export default store;