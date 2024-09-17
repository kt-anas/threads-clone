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
    /**
     * Extra reducers that handle the lifecycle of the `fetchUser` thunk.
     *
     * This includes setting the status to "loading" when the thunk is pending,
     * setting the status to "succeeded" and updating the users list when the thunk is fulfilled,
     * and setting the status to "failed" and setting an error message when the thunk is rejected.
     *
     * @param builder - The builder object from `createSlice`
     */
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                // Set the status to "loading" when the thunk is pending
                // This indicates that the thunk is still running and the state is being updated in the background
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                // Set the status to "succeeded" and update the users list when the thunk is fulfilled
                // This indicates that the thunk has completed successfully and the state is now up to date
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                // Set the status to "failed" and set an error message when the thunk is rejected
                // This indicates that the thunk has failed and the state is now in an error state
                state.status = "failed";
                state.error = action.error?.message ?? null;
            });
    } ,

});

export default userSlice.reducer;
