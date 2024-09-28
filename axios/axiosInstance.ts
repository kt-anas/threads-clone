import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-media-rest-apis.onrender.com/api',
});

axiosInstance.interceptors.request.use((config) => {
    return config;
})

axiosInstance.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    return Promise.reject(error);
})

export default axiosInstance; 