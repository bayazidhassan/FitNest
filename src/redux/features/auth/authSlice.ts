import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TRole = "admin" | "user" | "guest";

type TAuthState = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  role: TRole;
  image: string | null;
  token: string | null;
};

const initialState: TAuthState = {
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  role: "guest",
  image: null,
  token: null,
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
        email: string;
        phone: string;
        role: TRole;
        image: string;
        token: string;
      }>
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.image = action.payload.image;
      state.token = action.payload.token;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.phone = null;
      state.role = "guest";
      state.image = null;
      state.token = null;
    },
  },
});

export const { setUser,updateToken, logout } = authSlice.actions;
export default authSlice.reducer;
