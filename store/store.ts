import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
 import signupSlice from "./reducers/signupSlice";
 import currentUserSlice from "./reducers/currentUserSlice";
export const store = configureStore({
    reducer: {
        users: userSlice,
        signup:signupSlice,
        currentUser: currentUserSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;