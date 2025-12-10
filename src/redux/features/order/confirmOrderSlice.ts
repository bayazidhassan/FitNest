import { createSlice } from "@reduxjs/toolkit";

const confirmOrderSlice = createSlice({
  name: "confirmOrder",
  initialState: {
    confirmOrderAllowed: false,
  },
  reducers: {
    allowConfirmOrder: (state) => {
      state.confirmOrderAllowed = true;
    },
    resetConfirmOrder: (state) => {
      state.confirmOrderAllowed = false;
    },
  },
});

export const { allowConfirmOrder, resetConfirmOrder } =
  confirmOrderSlice.actions;
export default confirmOrderSlice.reducer;
