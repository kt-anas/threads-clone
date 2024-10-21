import axiosInstance from "@/axios/axiosInstance";

export const getServerProps = async ( ) => {
    const userId = localStorage.getItem('userId');  
    try {
        const response = await axiosInstance.get(`users/notification/${userId}`);
        const notifications = response.data;

        return {
            props: {
                notifications,
                error: null,
            },
        };
    } catch (error) {
        return {
            props: {
                notifications: [],
                error: (error as Error).message,
            },
        };
    }
};
