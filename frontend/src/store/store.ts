
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import packageSlice from "./packageSlice";
import userProfileSlice from './userProfileSlice'


const store =configureStore ({
    reducer: {
        auth:authSlice,
        package:packageSlice,
        userProfile:userProfileSlice
       
    }
})
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState=ReturnType<typeof store.getState>