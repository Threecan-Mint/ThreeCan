// packages
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import type { Auth } from "src/types";

// initial state
const initialState: Auth = {
  isAuthenticated: false,
  isLoggedOut: false,
  data: {},
};

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (_state, action: PayloadAction<Auth>) => {
      return { ...action.payload, isLoggedOut: false };
    },
    logOut: () => {
      return { ...initialState, isLoggedOut: true };
    },
  },
});

// actions
export const { setAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
