import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    return config;
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
})

export default axiosInstance; 