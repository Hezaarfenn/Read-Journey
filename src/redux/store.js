import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import booksReducer from "./books/booksSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isLoggedIn"],
};

const booksPersistConfig = {
  key: "books",
  storage,
  whitelist: ["ownBooks", "sessionsByBookId", "currentBookId"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  books: persistReducer(booksPersistConfig, booksReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

const initializeAuth = () => {
  const state = store.getState();
  if (state.auth.token) {
    import("./auth/authOps").then(({ setAuthHeader }) => {
      setAuthHeader(state.auth.token);
    });
  }
};

persistor.subscribe(() => {
  const { bootstrapped } = persistor.getState();
  if (bootstrapped) {
    initializeAuth();
  }
});
