import { createSlice } from "@reduxjs/toolkit";

const successOrderSlice = createSlice({
  name: "successOrder",
  initialState: {
    successOrderAllowed: false,
  },
  reducers: {
    allowSuccessOrder: (state) => {
      state.successOrderAllowed = true;
    },
    resetSuccessOrder: (state) => {
      state.successOrderAllowed = false;
    },
  },
});

export const { allowSuccessOrder, resetSuccessOrder } =
  successOrderSlice.actions;
export default successOrderSlice.reducer;
