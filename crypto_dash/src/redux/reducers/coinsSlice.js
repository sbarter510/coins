import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  coinData: [],
  loading: null,
  errors: null,
  chartData: [],
};

export const fetchCoinData = createAsyncThunk(
  "coins/fetchCoinData",
  async (page) => {
    const res = await axios.get(`http://localhost:5000/?page=${page}`);
    return res.data.data;
  }
);

export const fetchChartData = createAsyncThunk(
  "coins/fetchChartData",
  async (coin_name) => {
    coin_name = coin_name.toLowerCase().replaceAll(" ", "_");
    const res = await axios.get(
      `http://localhost:5000/fetchRange?coin_name=${String(coin_name)}`
    );
    console.log(res);
    return res.data.data;
  }
);

export const coinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = !state.loading;
    },
  },
  extraReducers: {
    [fetchCoinData.pending]: (state) => {
      state.loading = true;
    },
    [fetchCoinData.fulfilled]: (state, { payload }) => {
      state.coinData = payload;
      state.loading = false;
    },
    [fetchCoinData.rejected]: (state, { payload }) => {
      state.errors = payload;
    },
    [fetchChartData.fulfilled]: (state, { payload }) => {
      state.chartData = payload;
    },
    [fetchChartData.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [fetchChartData.rejected]: (state, { payload }) => {
      state.errors = payload;
    },
  },
});

export const { loading } = coinSlice.actions;

export const selectCoinData = (state) => state.coins.coinData;

export default coinSlice.reducer;
