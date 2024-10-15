import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../axios/axiosInstance";

 
interface UserState {
  user: any | null;  
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
 
const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null, 
};

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData: { username: string; password: string }, { rejectWithValue }) => {
    try {
        console.log(userData)
      const response = await axiosInstance.post('/users/login', userData);
      return response.data;
       
    } catch (error: any) {
    
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

 
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    
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

export const { resetState } = loginSlice.actions;
export default loginSlice.reducer;
