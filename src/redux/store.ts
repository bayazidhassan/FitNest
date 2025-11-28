import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/BaseApi";

export const store = configureStore({
  reducer: {
    //RTK Query
    [baseApi.reducerPath]: baseApi.reducer,

    //reducer
    //......
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
