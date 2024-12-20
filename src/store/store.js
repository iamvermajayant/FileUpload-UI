import { configureStore } from "@reduxjs/toolkit";
import fileUploadReducer from "./slices/fileUploadSlice";

const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer,
    links: linkReducer,
  },
});

export default store;
