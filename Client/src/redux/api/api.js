import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  // endpoint exported as hooks
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}` }),
    tagTypes: ["Chat"],
  endpoints: (builder) => ({
    // query ->get request || mutation -> post request invslidationtag
    myChat: builder.query({
      query: () => ({
        url: "chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export default api;
export const { useMyChatQuery } = api;
