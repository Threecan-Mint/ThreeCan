// packages
import { combineReducers } from "@reduxjs/toolkit";
// Import the individual reducers
import authReducer from "./slices/auth";
import paymentReducer from "./slices/payment";
import userReducer from "./slices/user";



// Combine the reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
  user: userReducer,
});

export default rootReducer;
