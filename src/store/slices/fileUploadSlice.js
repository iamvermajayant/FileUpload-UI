import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";
import axios from "axios";

// Thunk for file upload
export const uploadFile = createAsyncThunk(
  "fileUpload/upload",
  async ({ file, description, note }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("description", description);
      formData.append("note", note);

      const response = await axios.post('http://localhost:8000/api/files/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdmVybWEiLCJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJfaWQiOiI2NzYxN2ZmZWUyZmFjMjg5NmZjY2NiNmEiLCJlbWFpbCI6InF5Y3Z0ZmJ0eXNAcWFjbWplcS5jb20iLCJmaXJzdF9uYW1lIjoiamF5YW50IiwibGFzdF9uYW1lIjoidmVybWEiLCJ0YWdfY29kZSI6bnVsbCwiZXhwIjoxNzM0NjMxOTkyfQ.O0u-xMTtqRj-SORId-keD7j6oV2SKIkgOcdvH13O7nk'
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.status = "loading"; 
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default fileUploadSlice.reducer;
