import { createSlice } from "@reduxjs/toolkit";
import authApi from "./auth.service";

export type AuthState = {
    accessToken: string | null;
    user: {
        id: string;
        email: string;
    } | null;
    status: "idle" | "loading" | "failed" | "succeeded";
    error: string | null;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    status: 'idle',
    error: null,
}

const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        logOut: (state) => {
            state.accessToken = "";
        }
    },
    extraReducers: (builder) => {
    builder
        .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
        if(action.payload.code >= 401) {
            state.status = 'failed';
            state.error = (action?.payload?.error as any)?.message ?? null;
        }
        if(action.payload.code >= 400) return
        state.accessToken = action.payload.data.accessToken;
        state.user = {
            id: action.payload.data.id,
            email: action.payload.data.email,
        };
        state.status = 'succeeded';
        state.error = null;
        })
        .addMatcher(authApi.endpoints.signIn.matchPending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addMatcher(authApi.endpoints.signIn.matchRejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? null;
        })
        .addMatcher(authApi.endpoints.logOut.matchFulfilled, (state) => {
            state.accessToken = null;
            state.user = null;
            state.status = 'idle';
        })
        .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
            if(action.payload.code >= 400) return
            state.accessToken = action.payload.data.accessToken;
            state.status = 'succeeded';
        })
        .addMatcher(authApi.endpoints.refreshToken.matchPending, (state) => {
            state.status = 'loading';
        })
        .addMatcher(authApi.endpoints.refreshToken.matchRejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? null;
        })
        .addMatcher(authApi.endpoints.verifyToken.matchFulfilled, (state, action) => {
            if(action.payload.code >= 400) return
            if(action.payload.data.accessToken) {
                state.accessToken = action.payload.data.accessToken;
                state.user = {
                    id: action.payload.data.id,
                    email: action.payload.data.email,
                }
            }
        })
    }
});

export default authSlice.reducer;
