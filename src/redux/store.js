import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import teacherReducer from "./teachers/teachersSlice";
import authReducer from "./auth/authSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const persistedAuthReducer = persistReducer(
  {
    key: "Authtoken",
    storage,
    whitelist: ["token"],
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    teachers: teacherReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
