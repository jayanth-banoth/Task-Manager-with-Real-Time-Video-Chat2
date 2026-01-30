import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("loginUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("loginUserSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase("loginUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("registerUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("registerUserSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase("registerUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("logoutUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("logoutUserSuccess", (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase("logoutUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = true;
        })
        .addCase("loadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("loadUserSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase("loadUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        });
});