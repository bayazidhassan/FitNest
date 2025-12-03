import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  name: string | null;
  email: string | null;
  image: string | null;
};

const initialState: TAuthState = {
  name: null,
  email: null,
  image: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string; image: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.image = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
