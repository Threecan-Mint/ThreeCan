// packages
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

// presist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// presisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
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

// root type
export type RootState = ReturnType<typeof store.getState>;

// persistor
export const persistor = persistStore(store);

export default store;
