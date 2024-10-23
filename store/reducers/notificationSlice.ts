import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/axios/axiosInstance";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePic: string;
}

interface Notification {
  id: string;
  description: string;
  senderUserId: User; 
}

interface NotificationState {
  notifications: Notification[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  status: 'idle',
  error: null,
};

 
 
 
 