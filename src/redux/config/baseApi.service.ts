import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {RootState} from "./store";

export type APIResponse<T> = {
  code: number,
  message: 'Success' | 'Error',
  error: {
    error: string,
    message: string,
    statusCode: number,
  } | string | null,
  path: string,
  timestamp: string,
  data: T | any | null,
}

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    credentials: 'include',
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: async (headers, api) => {
      const accessToken = (api.getState() as RootState)?.authReducer?.accessToken || null;
      if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    },
    validateStatus: (response) => {
        return response.status >= 200 && response.status < 500;
    }
  }),
  endpoints: () => ({}),
  tagTypes: ["Auth", "TaskList"],
});

export default baseApi;
