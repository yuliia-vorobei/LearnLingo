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
import favoriteReducer from "./favorite/favoriteSlice";
import filtersReducer from "./filter/filterSlice";
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
    favorite: favoriteReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
