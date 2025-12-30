import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, updateToken } from "../features/auth/authSlice";
import type { RootState } from "../store";

//for access token
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  //baseUrl: "https://fit-nest-backend.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

//for refresh token
const baseQueryWithRefreshToken = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    //try refresh
    const refreshResult = await baseQuery(
      { url: "/auth/refresh_token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newToken = (refreshResult.data as any).data.token;

      //update token in store
      api.dispatch(updateToken(newToken));

      //retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  /*
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    //baseUrl: "https://fit-nest-backend.vercel.app/api/v1",
    credentials: "include"
  }),
  */
  //baseQuery: baseQuery, //for access token
  baseQuery: baseQueryWithRefreshToken, //for refresh token

  tagTypes: ["Products", "Orders"],
  endpoints: () => ({}),
});
