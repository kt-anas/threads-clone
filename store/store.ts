import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
 import signupSlice from "./reducers/signupSlice";
export const store = configureStore({
    reducer: {
        users: userSlice,
        signup:signupSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;