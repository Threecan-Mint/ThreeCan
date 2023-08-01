// packages
import { combineReducers } from "@reduxjs/toolkit";
// Import the individual reducers
import authReducer from "./slices/auth";
import paymentReducer from "./slices/payment";


// Combine the reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
});

export default rootReducer;
