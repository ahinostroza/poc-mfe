import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import user from "./slices/user";
// import brand from "./slices/brand";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  FLUSH,
  PAUSE,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from '../services/client';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      console.log(_key);
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      console.log(_key);
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  transforms: [],
};

const reducer = {
  [api.reducerPath]: api.reducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducer)
);

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([api.middleware]);
  },
});

setupListeners(reduxStore.dispatch);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;