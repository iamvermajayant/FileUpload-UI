// src/store/slices/linkSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../utils/apiClient";

// Create Link Thunk
export const createLink = createAsyncThunk(
  "links/createLink",
  async ({ fileId, description, note, expirationDays, tagCode, password, viewLimit }, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/files/create-link", {
        file_id: fileId,
        description,
        note,
        expiration_days: expirationDays,
        tag_code: tagCode,
        password,
        view_limit: viewLimit
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const linkSlice = createSlice({
  name: "links",
  initialState: {
    links: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLink.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.links.push(action.payload);
      })
      .addCase(createLink.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export default linkSlice.reducer;