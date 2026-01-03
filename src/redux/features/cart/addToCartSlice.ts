import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TCartItem = {
  product_id: string;
  name: string;
  price: number;
  image: string;
  stock_quantity: number;
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
        name: string;
        price: number;
        image: string;
        stock_quantity: number;
      }>
    ) => {
      const item = state.find(
        (p) => p.product_id === action.payload.product_id
      );
      if (item) {
        if (item.quantity < item.stock_quantity) {
          item.quantity += 1;
        }
      } else {
        state.push({
          product_id: action.payload.product_id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          stock_quantity: action.payload.stock_quantity,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.product_id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; type: "inc" | "dec" }>
    ) => {
      const item = state.find((i) => i.product_id === action.payload.id);
      if (item) {
        if (action.payload.type === "inc") {
          item.quantity += 1;
        } else if (action.payload.type === "dec" && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
