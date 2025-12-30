import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, updateToken } from "../features/auth/authSlice";
import type { RootState } from "../store";

//for access token
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  //baseUrl: "https://fit-nest-backend.vercel.app/api/v1",
  credentials: "include", //send cookies
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

//for refresh token
const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api: any, extraOptions: any) => {
  //Try the original request first
  let result = await baseQuery(args, api, extraOptions);

  //If 401 → access token expired or invalid
  if (result.error?.status === 401) {
    //Try refreshing the access token using refresh token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh_token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newToken = (refreshResult.data as any).data.token;

      //update token in redux store
      api.dispatch(updateToken(newToken));

      //retry original request with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      //Refresh failed → logout user
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
    credentials: "include" //send cookies
  }),
  */
  //baseQuery: baseQuery, //for access token
  baseQuery: baseQueryWithRefreshToken, //for refresh token

  tagTypes: ["Products", "Orders"],
  endpoints: () => ({}),
});
