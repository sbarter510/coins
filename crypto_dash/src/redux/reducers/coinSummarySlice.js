import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "coinSummary/fetchData",
  async (coin, days) => {
    const res = await axios.get(`http://localhost:5000/summary/${coin}`);
    return res.data.data.prices;
  }
);

const initialState = {
  coinSummaryChartData: [],
  loading: null,
};

export const coinSummarySlice = createSlice({
  name: "coinSummary",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.loading = true;
    },
    [fetchData.fulfilled]: (state, { payload }) => {
      let formattedChartData = [];
      console.log(payload);
      payload.forEach((d) => {
        formattedChartData.push({ x: d[0], y: +d[1] });
      });
      state.loading = false;
      state.coinSummaryChartData = formattedChartData;
      // state.coinSummaryChartData = payload;
    },
    [fetchData.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const selectCoinChartData = (state) =>
  state.coinSummary.coinSummaryChartData;

export default coinSummarySlice.reducer;
