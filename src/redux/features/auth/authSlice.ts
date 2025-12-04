import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TRole = "admin" | "user";

type TAuthState = {
  name: string | null;
  email: string | null;
  role: TRole;
  image: string | null;
};

const initialState: TAuthState = {
  name: null,
  email: null,
  role: "user",
  image: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        role: TRole;
        image: string;
      }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.image = action.payload.image;
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.role = "user";
      state.image = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
