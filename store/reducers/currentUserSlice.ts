import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching a user by ID
export const fetchUserById = createAsyncThunk("user/fetchUserById", async (id: string) => {
  const response = await axios.get(`https://social-media-rest-apis.onrender.com/api/users/${id}`);
  return response.data;
});

// Define the state interface
interface CurrentUserState {
  currentUser: {
    name: string;
    username: string;
    email: string;
    bio: string | null;
    profilePic: string;
  } | null; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: CurrentUserState = {
  currentUser: null,
  status: "idle",
  error: null,
};

// Create a slice for user state management
const currentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user.";
      });
  },
});

// Export the reducer
export default currentUserSlice.reducer;
