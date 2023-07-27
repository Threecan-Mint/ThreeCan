// packages
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import type { Auth } from "src/types";

// Define the initial state for the auth slice
const initialState: Auth = {
  isAuthenticated: false,
  isLoggedOut: false,
  data: {},
};

// Define the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set the auth state
    setAuth: (_state, action: PayloadAction<Auth>) => {
      return { ...action.payload, isLoggedOut: false };
    },
    // Log out by resetting the auth state to its initial value
    logOut: () => {
      return { ...initialState, isLoggedOut: true };
    },
  },
});

// Export the actions and the reducer
export const { setAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
