import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];
console.log("CartSlice.jsx의 cart localstorage : ", initialState);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
      // 추가된 부분: localStorage 업데이트
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteFromCart(state, action) {
      const updatedState = state.filter((item) => item.id != action.payload.id);
      // 추가된 부분: localStorage 업데이트
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
    incrementQuantity(state, action) {
      const updatedState = state.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
      // 추가된 부분: localStorage 업데이트
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
    decrementQuantity(state, action) {
      const updatedState = state.map((item) => {
        if (item.quantity !== 1) {
          if (item.id === action.payload) {
            item.quantity--;
          }
        }
        return item;
      });
      // 추가된 부분: localStorage 업데이트
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
