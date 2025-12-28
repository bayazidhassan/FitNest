import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  //baseUrl: "https://fit-nest-backend.vercel.app/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  /*
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    //baseUrl: "https://fit-nest-backend.vercel.app/api/v1",
  }),
  */
  baseQuery: baseQuery, //for jwt token

  tagTypes: ["Products", "Orders"],
  endpoints: () => ({}),
});
