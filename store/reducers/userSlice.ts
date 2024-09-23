import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const response = await axios.get('https://social-media-rest-apis.onrender.com/api/users/');
    return response.data.users; // Adjust based on your API response structure
});

// Fetch user posts by user ID
 
// Fetch specific user details by user ID
export const fetchUserData = createAsyncThunk("user/fetchUserData", async (userId: string) => {
    const response = await axios.get(`https://social-media-rest-apis.onrender.com/api/users/${userId}`);
    return response.data; // Assuming this returns a single user object
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
    userData: User[]; // Add userData to the state for specific user data
    posts: any[]; // Add posts to the state
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UserState = {
    users: [],
    userData: [], // Initialize userData to null
    posts: [],
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetching all users
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
