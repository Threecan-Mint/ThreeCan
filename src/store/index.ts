// Import dependencies
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
//
import rootReducer from "./rootReducer";

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Create a persistor
export const persistor = persistStore(store);

// Export the store
export default store;
