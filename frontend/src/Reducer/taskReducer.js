import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const taskReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("createTaskRequest", (state) => {
            state.loading = true
        })
        .addCase("createTaskSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("createTaskFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getUserTasksRequest", (state) => {
            state.loading = true
        })
        .addCase("getUserTasksSuccess", (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase("getUserTasksFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getUserImpTasksRequest", (state) => {
            state.loading = true
        })
        .addCase("getUserImpTasksSuccess", (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase("getUserImpTasksFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getUserComTasksRequest", (state) => {
            state.loading = true
        })
        .addCase("getUserComTasksSuccess", (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase("getUserComTasksFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("updateTaskRequest", (state) => {
            state.loading = true
        })
        .addCase("updateTaskSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateTaskFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("deleteTaskRequest", (state) => {
            state.loading = true
        })
        .addCase("deleteTaskSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("deleteTaskFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })
        .addCase("clearMessage",(state)=>{
            state.message = null;
        });
});