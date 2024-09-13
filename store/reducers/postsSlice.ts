import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for User and Post
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
    comments: string[];
    createdOn: string;
}

interface PostsState {
    posts: Post[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

// Initial state for the posts
const initialState: PostsState = {
    posts: [],
    status: "idle",
    error: null,
};

// Thunk for fetching posts from the API
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get('https://social-media-rest-apis.onrender.com/api/posts');
    return response.data.posts;
});

// Thunk for adding a new post to the API
export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async (newPost: { userId: string; text: string; image?: string | null }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://social-media-rest-apis.onrender.com/api/posts', newPost);
            return response.data; 
            
        } catch (error: string | any) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: 'Failed to add new post' });
            }
        }
    }
);

// Redux slice for handling posts
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
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch posts.";
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
                state.error = action.error.message || "Failed to add post.";
            });
    },
});

export default postsSlice.reducer;
