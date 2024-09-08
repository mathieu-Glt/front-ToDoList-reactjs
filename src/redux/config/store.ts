import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import baseApi from "./baseApi.service";
import authReducer from "../features/auth/auth.slice";

export const store = configureStore({
    devTools: process.env["NODE_ENV"] === "development",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(baseApi.middleware),

    reducer: {
        authReducer: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
