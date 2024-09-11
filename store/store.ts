import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
 import signupSlice from "./reducers/signupSlice";
 import postsSlice from "./reducers/postsSlice";
//  import { createWrapper } from "next-redux-wrapper";
 
export const store = configureStore({
    reducer: {
        users: userSlice,
        signup:signupSlice,
        posts: postsSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;