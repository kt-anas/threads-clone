import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching users from the API
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const response = await axios.get('https://social-media-rest-apis.onrender.com/api/users/');
    return response.data.users; // Adjust this based on API response structure
});

// User interface
interface User {
    username: string;
    _id: string;
    email: string;
    profilePic: string;
}

// Initial state for the slice
interface UserState {
    users: User[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

// Initial state
const initialState: UserState = {
    users: [],
    status: "idle",
    error: null,
};

// Slice definition
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    /**
     * Extra reducers that handle the async thunk actions.
     * 
     * @param {ActionReducerMapBuilder<UserState>} builder - The builder object used to define extra reducers.
     */
    extraReducers: (builder) => {
        /**
         * When the fetchUser thunk is pending, set the status of the state to "loading"
         * @param {UserState} state - The state object to be updated.
         */
        builder.addCase(fetchUser.pending, (state) => {
            state.status = "loading";
        });

        /**
         * When the fetchUser thunk is fulfilled, set the status of the state to "succeeded" and
         * update the users array with the payload from the thunk.
         * @param {UserState} state - The state object to be updated.
         * @param {FetchUserAction} action - The action object containing the payload.
         */
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            
            state.users = action.payload;
        });

        /**
         * When the fetchUser thunk is rejected, set the status of the state to "failed" and
         * update the error string with the error message from the thunk.
         * @param {UserState} state - The state object to be updated.
         * @param {FetchUserAction} action - The action object containing the error message.
         */
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error?.message ?? null;
        });
    },
});

export default userSlice.reducer;
