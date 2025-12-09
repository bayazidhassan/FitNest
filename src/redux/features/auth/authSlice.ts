import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TRole = "admin" | "user";

type TAuthState = {
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  role: TRole;
  image: string | null;
};

const initialState: TAuthState = {
  firstName: null,
  lastName: null,
  address: null,
  email: null,
  phone: null,
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
        firstName: string;
        lastName: string;
        address: string;
        email: string;
        phone: string;
        role: TRole;
        image: string;
      }>
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.image = action.payload.image;
    },
    logout: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.address = null;
      state.email = null;
      state.phone = null;
      state.role = "user";
      state.image = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
