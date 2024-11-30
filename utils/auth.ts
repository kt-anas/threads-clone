// utils/auth.ts
import axiosInstance from '@/axios/axiosInstance';

export const loginUser = async (userData: { username: string; password: string }) => {
    try {
        const res = await axiosInstance.post('/users/login', userData);
        localStorage.setItem('userId', res.data.user._id);
        return res.data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Failed to login. Please try again.");
    }
};
