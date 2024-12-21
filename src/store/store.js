import { configureStore } from "@reduxjs/toolkit";
import fileUploadReducer from "./slices/fileUploadSlice";
import linkReducer from "./slices/linkSlice";

const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer,
    links: linkReducer,
  },
});

export default store;
