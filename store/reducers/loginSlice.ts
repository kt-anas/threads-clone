import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the slice state
interface UserState {
  user: any | null; // Replace 'any' with your user type if you have one defined
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state with type
const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

// Define the async thunk
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData: { username: string; password: string }, { rejectWithValue }) => {
    try {
        console.log(userData)
      const response = await axios.post('https://social-media-rest-apis.onrender.com/api/users/login', userData);
      return response.data;
      
      
    } catch (error: any) {
      // Send backend error message as rejected value
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

// Create the slice
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // Define any sync reducers here if needed
    resetState: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the reset action if needed
export const { resetState } = loginSlice.actions;

// Export the reducer
export default loginSlice.reducer;
