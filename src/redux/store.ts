import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/BaseApi";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/addToCartSlice";
import successOrderReducer from "./features/order/successOrderSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  //RTK Query
  [baseApi.reducerPath]: baseApi.reducer,

  //reducers
  auth: authReducer,
  cart: cartReducer,
  successOrder: successOrderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "successOrder"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
