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

export const { increment, decrement, incrementByAmount } = headerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.header.value;

export const selectGlobalData = (state) => state.header.globalData;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default headerSlice.reducer;
