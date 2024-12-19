import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../utils/apiClient";

// Thunk for file upload
export const uploadFile = createAsyncThunk(
  "fileUpload/upload",
  async ({ file, description, note }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("description", description);
      formData.append("note", note);

      const response = await userRequest.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for fetching all files
export const fetchFiles = createAsyncThunk(
  "fileUpload/fetchFiles",
  async ({ page = 1, perPage = 10, sortOrder = "asc" }, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(
        `/files?page=${page}&per_page=${perPage}&sort_order=${sortOrder}`
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    Allfiles: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    fetchStatus: "idle",
    toastVisible: false,
  },
  reducers: {
    showToast: (state) => {
      state.toastVisible = true;
    },
    hideToast: (state) => {
      state.toastVisible = false;
    },
  },
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
      })
      .addCase(fetchFiles.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.Allfiles = action.payload.data; // Assuming the response contains `data`
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { showToast, hideToast } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
