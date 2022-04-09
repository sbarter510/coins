import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./reducers/headerSlice";
import coinSlice from "./reducers/coinsSlice";
import coinSummarySlice from "./reducers/coinSummarySlice";

export const store = configureStore({
  reducer: {
    header: headerSlice,
    coins: coinSlice,
    coinSummary: coinSummarySlice,
  },
});
