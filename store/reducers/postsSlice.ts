import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
}
interface Post {
    _id: string;
    user: User;
    text: string;
    image: string;
    likes: string[];
    comments: string[];
    
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

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
         const response = await axios.get('https://social-media-rest-apis.onrender.com/api/posts');
        return response.data.posts;
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch posts.";
            });
    },
});

export default postsSlice.reducer;