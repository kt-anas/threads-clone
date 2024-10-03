import axiosInstance from "@/axios/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 
 

interface SignupState {
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    confirmPassword: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: SignupState = {
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
    status: 'idle',
    error: null
};

// Change from http to https
 
 
export const signupUser = createAsyncThunk(
    'signup/signupUser',
    async (userData: { name: string; username: string; email: string; password: string; phone: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/users/signup', userData);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            // Send backend error message as rejected value
            return rejectWithValue(error.response.data.message);
        }
    }
);

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.status = 'succeeded';
                
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setName, setUsername, setEmail, setPassword, setPhone, setConfirmPassword } = signupSlice.actions;
export default signupSlice.reducer;
