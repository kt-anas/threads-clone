import axiosInstance from "@/axios/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
 
interface User {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
}

interface Post {
    _id: string;
    postById: User;
    text: string;
    image?: string;
    likes: string[];
    replies: string[];
    createdOn: string;
    reposts: string[];
}
interface PostsState {
    posts: Post[];
    post: Post[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}
const initialState: PostsState = {
    posts: [],
    post: [],
    status: "idle",
    error: null,
};

export const fetchPostsByUserId = createAsyncThunk(
    "posts/fetchPostsByUserId",
    async (userId: string) => {
        const response = await axiosInstance.get(`/posts/${userId}`);
        return response.data.posts;
    }
);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axiosInstance.get('/posts');
    return response.data.posts;
});
export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async (newPost: { userId: string; text: string; image: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/posts', newPost);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: 'Failed to add new post' });
            }
        }
    }
);
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsByUserId.pending,(state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPostsByUserId.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = "succeeded";
                state.post = action.payload;
            })
            .addCase(fetchPostsByUserId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error";
            })



            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error";
            })



            .addCase(addNewPost.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addNewPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.status = "succeeded";
                state.posts.unshift(action.payload);
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error";
            });
    },
});

export default postsSlice.reducer;
