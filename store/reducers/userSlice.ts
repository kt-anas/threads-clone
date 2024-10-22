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
    bio: string;
}

interface UserState {
    users: User[];
    userId: string | null;
    userData: User[]; 
    posts: any[]; 
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UserState = {
    users: [],
    userId:null,
    userData: [], 
    posts: [],
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUserId:(state,action) =>{
            state.userId = action.payload
        }
    },
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
    },
});

export const {setUserId} = userSlice.actions;
export default userSlice.reducer;

export const getUserId = () => (dispatch) => {
    const userId = localStorage.getItem('userId');
    if(userId){
        dispatch(setUserId(userId));
    }
}
