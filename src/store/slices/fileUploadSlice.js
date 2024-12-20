// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { userRequest } from "../../utils/apiClient";

// // Thunk for file upload
// export const uploadFile = createAsyncThunk(
//   "fileUpload/upload",
//   async ({ file, description, note }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       file.forEach((file) => {
//         formData.append("files", file);
//       });
//       formData.append("files", file);
//       formData.append("description", description);
//       formData.append("note", note);

//       const response = await userRequest.post("/files/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       return response?.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Thunk for fetching all files
// export const fetchFiles = createAsyncThunk(
//   "fileUpload/fetchFiles",
//   async ({ page = 1, perPage = 8, sortOrder = "asc" }, { rejectWithValue }) => {
//     try {
//       const response = await userRequest.get(
//         `/files?page=${page}&per_page=${perPage}&sort_order=${sortOrder}`
//       );
//       console.log(response?.data)
//       return response?.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const deleteFile = createAsyncThunk(
//   "fileUpload/deleteFile",
//   async (fileId, { rejectWithValue }) => {
//     try {
//       const response = await userRequest.delete(`/files/${fileId}`);
//       console.log(response?.data)
//       return response?.data;  // Return file ID to identify the deleted file
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );


// const fileUploadSlice = createSlice({
//   name: "fileUpload",
//   initialState: {
//     Allfiles: [],
//     status: "idle", // idle | loading | succeeded | failed
//     error: null,
//     fetchStatus: "idle",
//     toastVisible: false,
//   },
//   reducers: {
//     showToast: (state) => {
//       state.toastVisible = true;
//     },
//     hideToast: (state) => {
//       state.toastVisible = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadFile.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(uploadFile.fulfilled, (state) => {
//         state.status = "succeeded";
//       })
//       .addCase(uploadFile.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(fetchFiles.pending, (state) => {
//         state.fetchStatus = "loading";
//       })
//       .addCase(fetchFiles.fulfilled, (state, action) => {
//         state.fetchStatus = "succeeded";
//         state.Allfiles = action.payload.data; // Assuming the response contains `data`
//       })
//       .addCase(fetchFiles.rejected, (state, action) => {
//         state.fetchStatus = "failed";
//         state.error = action.payload;
//       })
//       .addCase(deleteFile.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteFile.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Remove the deleted file from the Allfiles array
//         state.Allfiles = state.Allfiles.filter(file => file.id !== action.payload);
//       })
//       .addCase(deleteFile.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { showToast, hideToast } = fileUploadSlice.actions;
// export default fileUploadSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../utils/apiClient";

// Thunk for file upload
export const uploadFile = createAsyncThunk(
  "fileUpload/upload",
  async ({ files, description, note }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("description", description);
      formData.append("note", note);

      const response = await userRequest.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for fetching all files
export const fetchFiles = createAsyncThunk(
  "fileUpload/fetchFiles",
  async ({ page = 1, perPage = 8, sortOrder = "asc" }, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(
        `/files?page=${page}&per_page=${perPage}&sort_order=${sortOrder}`
      );
      console.log(response?.data)
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "fileUpload/deleteFile",
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await userRequest.delete(`/files/${fileId}`);
      console.log(response?.data)
      return fileId;  // Return file ID to identify the deleted file
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
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Check the structure of the response and update accordingly
        if (Array.isArray(action.payload)) {
          // If the payload is already an array, we can spread it directly
          state.Allfiles = [...state.Allfiles, ...action.payload];
        } else if (action.payload && typeof action.payload === 'object') {
          // If the payload is an object, it might contain the files in a property
          // Adjust 'data' to match the actual property name in your API response
          const newFiles = action.payload.data || [action.payload];
          state.Allfiles = [...state.Allfiles, ...newFiles];
        } else {
          // If the payload structure is unexpected, log an error
          console.error('Unexpected payload structure:', action.payload);
        }
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
      })
      .addCase(deleteFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted file from the Allfiles array
        state.Allfiles = state.Allfiles.filter(file => file.id !== action.payload);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { showToast, hideToast } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;


