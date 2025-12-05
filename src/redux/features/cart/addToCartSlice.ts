import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TCartItem = {
  product_id: string;
  quantity: number;
};

const initialState: TCartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product_id: string;
        quantity: number;
        stock: number;
      }>
    ) => {
      const item = state.find(
        (p) => p.product_id === action.payload.product_id
      );

      if (item) {
        if (item.quantity < action.payload.stock) {
          item.quantity += action.payload.quantity;
        }
      } else {
        state.push({
          product_id: action.payload.product_id,
          quantity: Math.min(action.payload.quantity, action.payload.stock),
        });
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
