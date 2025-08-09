import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, ISendOTP } from "@/types";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<null, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,  
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,  
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOTP>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation } = authApi;