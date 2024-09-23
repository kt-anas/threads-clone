import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
    image?: string; // Optional, as some posts may not have images
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
        const response = await axios.get(`https://social-media-rest-apis.onrender.com/api/posts/${userId}`);
        return response.data.post; // Adjust based on your API response structure
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle pending state
            .addCase(fetchPostByUserId.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            // Handle fulfilled state
            .addCase(fetchPostByUserId.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = "succeeded";
                state.posts = action.payload; // Store the fetched posts
            })
            // Handle rejected state
            .addCase(fetchPostByUserId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch posts.";
            });
    },
});

export default postSlice.reducer;
