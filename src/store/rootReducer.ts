// packages
import { combineReducers } from "@reduxjs/toolkit";
// slices
import auth from "./slices/auth";

// root reducer
const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
