import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./reducers/headerSlice";
import coinSlice from "./reducers/coinsSlice";

export const store = configureStore({
  reducer: {
    header: headerSlice,
    coins: coinSlice,
  },
});
