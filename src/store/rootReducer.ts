// packages
import { combineReducers } from "@reduxjs/toolkit";
// Import the individual reducers
import authReducer from "./slices/auth";

// Combine the reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
