import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../redux/slices';

export const store = configureStore({
    reducer: {
        userAuth: authSlice
    }
});
