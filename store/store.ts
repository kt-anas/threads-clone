import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
 import signupSlice from "./reducers/signupSlice";
 import postsSlice from "./reducers/postsSlice";
 import postSlice from "./reducers/postSlice";
 import loginSlice from "./reducers/loginSlice";
import  notificationsSlice from "./reducers/notificationSlice";
 import { createWrapper } from "next-redux-wrapper";
 
export const makeStore = () =>  {
    return configureStore({
        reducer: {
            users: userSlice,
            signup:signupSlice,
            posts: postsSlice,
            post:postSlice,
            login:loginSlice,
            notifications:notificationsSlice
        },
    });
};



// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// export const wrapper = createWrapper(() => store);