import axiosInstance from "@/axios/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
 

interface Reply {
    _id: string;
    text: string;
    image?: string;
}
interface Post {
    _id: string;
    userId: string;
    username: string;
    userProfilePic: string;
    text: string;
    image?: string; 
    likes: number;
    comments: number;
    createdAt: string;
    replies: Reply[];
    reposts: string[];

    updatedAt: string;
    __v: number;
}

interface PostsState {
    posts: Post[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    status: "idle",
    error: null,
};

export const fetchPostByUserId = createAsyncThunk(
    "posts/fetchPostByUserId",
    async (userId: string) => {
        const response = await axiosInstance.get(`/posts/${userId}`);
        return response.data.post;  
});


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            
            .addCase(fetchPostByUserId.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
             
            .addCase(fetchPostByUserId.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = "succeeded";
                state.posts = action.payload; 
            })
            
            .addCase(fetchPostByUserId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch posts.";
            });
    },
});

export default postSlice.reducer;
