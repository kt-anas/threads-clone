import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import signupSlice from "./signupSlice";
import postsSlice from "./postsSlice";
import postSlice from "./postSlice";
import modalSlice from "./modalSlice";



export const store = configureStore({
    reducer: {
        users: userSlice,
        signup: signupSlice,
        posts: postsSlice,
        post: postSlice,
        modal:modalSlice


    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


