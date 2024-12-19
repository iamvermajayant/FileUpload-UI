import { configureStore } from "@reduxjs/toolkit";
import fileUploadReducer from "./slices/fileUploadSlice";

const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer,
  },
});

export default store;
