import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,  // regular method is body : userInfo. If we use axios we have to use data otherwise we will not get payload
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo, // regular method is body : userInfo. If we use axios we have to use data otherwise we will not get payload 
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;