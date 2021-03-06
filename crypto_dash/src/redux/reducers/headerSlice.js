import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "header/fetchData",
  async (thunkAPI) => {
    const res = await axios.get("http://localhost:5000/global");
    return res.data.data.data;
  }
);

const initialState = {
  value: 0,
  globalData: [],
  loading: null,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.loading = true;
    },
    [fetchData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.globalData = payload;
    },
    [fetchData.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const selectGlobalData = (state) => state.header.globalData;

export default headerSlice.reducer;
