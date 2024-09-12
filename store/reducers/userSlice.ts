import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const response = await axios.get('https://social-media-rest-apis.onrender.com/api/users/');
    return response.data.users; // Adjust based on your API response structure
});

interface User {
    _id: string;
    email: string;
    username: string;
    profilePic: string;
}

interface UserState {
    users: User[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UserState = {
    users: [],
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.users = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error?.message ?? null;
        });
    },
});

export default userSlice.reducer;
