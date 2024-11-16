import { configureStore } from "@reduxjs/toolkit";
import workoutSlice from "./workoutSlice";
import adminSlice from "./adminSlice";
import packageSlice from "./packageSlice";


const store =configureStore({
    reducer: {
        workout:workoutSlice,
        admin:adminSlice,
        package:packageSlice
    }
})

export default store; 
export type AppDispatch = typeof store.dispatch;
export type RootState=ReturnType<typeof store.getState>