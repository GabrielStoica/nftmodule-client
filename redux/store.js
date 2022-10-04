import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slicers/walletSlicer";

export default configureStore({
  reducer: { walletReducer },
});
