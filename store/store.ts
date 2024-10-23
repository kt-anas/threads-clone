import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import signupSlice from "./reducers/signupSlice";
import postsSlice from "./reducers/postsSlice";
import postSlice from "./reducers/postSlice";
 
import notificationsSlice from "./reducers/notificationSlice";

export const store = configureStore( {
        reducer: {
            users: userSlice,
            signup: signupSlice,
            posts: postsSlice,
            post: postSlice,
           
            notifications: notificationsSlice
        },
    });


    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;


 