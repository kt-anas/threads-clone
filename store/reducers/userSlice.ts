import axiosInstance from "@/axios/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 


export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const response = await axiosInstance.get('/users/');
    return response.data.users; 
});

 
 
 
export const fetchUserData = createAsyncThunk("user/fetchUserData", async (userId: string) => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data; 
})

interface User {
    _id: string;
    name: string;
    followers: string[];
    following: string[];
    email: string;
    username: string;
    profilePic: string;
}

interface UserState {
    users: User[];
    userData: User[]; 
    posts: any[]; 
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UserState = {
    users: [],
    userData: [], 
    posts: [],
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message ?? null;
            });

       
        // Handle fetching specific user data by ID
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userData = action.payload; // Set specific user data
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message ?? null;
            });
    },
});

export default userSlice.reducer;
