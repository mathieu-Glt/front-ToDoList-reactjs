import baseApi, {APIResponse} from "../../config/baseApi.service";
import {SignInInput, AuthOutput, SignUpInput, LogOutInput} from "./auth.type";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<APIResponse<AuthOutput>, SignInInput>({
            invalidatesTags: ["Auth"],
            query: (body) => ({
                body,
                method: "POST",
                url: "/auth/sign-in",
            })
        }),
        signUp: builder.mutation<APIResponse<AuthOutput>, SignUpInput>({
            invalidatesTags: ["Auth"],
            query: (body) => ({
                body,
                method: "POST",
                url: "/auth/sign-up",
            })
        }),
        logOut: builder.mutation<APIResponse<void>, LogOutInput>({
            invalidatesTags: ["Auth"],
            query: (body) => ({
                method: "POST",
                url: `/auth/log-out`,
                body,
            }),
        }),
        refreshToken: builder.mutation<APIResponse<AuthOutput>, void>({
            invalidatesTags: ["Auth"],
            query: () => ({
                method: "POST",
                url: "/auth/refresh-token",
            })
        }),
        verifyToken: builder.query<APIResponse<{token: string}>, void>({
            providesTags: ["Auth"],
            query: () => ({
                method: "GET",
                url: "/auth/verify-token",
            }),
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useLogOutMutation,
    useVerifyTokenQuery
} = authApi;
export default authApi;
