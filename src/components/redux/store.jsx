import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Cart/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  devTools: true,
});
