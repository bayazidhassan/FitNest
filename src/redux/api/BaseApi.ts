import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    //baseUrl: "http://localhost:5000/api/v1",
    baseUrl: "https://fit-nest-backend.vercel.app/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
