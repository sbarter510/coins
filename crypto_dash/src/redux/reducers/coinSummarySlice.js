import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "coinSummary/fetchData",
  async (args) => {
    const res = await axios.get(
      `http://localhost:5000/summary/${args.coin}/${args.days}`
    );
    return res.data.data.prices;
  }
);

export const fetchDescription = createAsyncThunk(
  "coinSummary/fetchDescription",
  async (args) => {
    const res = await axios.get(`http://localhost:5000/details/${args.coin}`);
    //TODO make language dynamic
    console.log(res);
    return res.data.data;
  }
);

// export const fetchMarketData = createAsyncThunk()

const initialState = {
  coinSummaryChartData: [],
  loading: null,
  coinDescription: null,
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
    [fetchDescription.pending]: (state) => {
      state.loading = true;
    },
    [fetchDescription.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.coinDescription = payload;
      // state.coinSummaryChartData = payload;
    },
    [fetchDescription.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const selectCoinChartData = (state) =>
  state.coinSummary.coinSummaryChartData;

export const selectCoinDescription = (state) =>
  state.coinSummary.coinDescription;

export default coinSummarySlice.reducer;
