import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
  },
});
