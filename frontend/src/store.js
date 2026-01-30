import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducer/userReducer";
import { taskReducer } from "./Reducer/taskReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        task: taskReducer,
    }
});
export default store;