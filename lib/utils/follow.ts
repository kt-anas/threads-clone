
'use server'
import axiosInstance from "@/axios/axiosInstance";
import { getUserId } from "./getCookie";


export const FollowStatus = async (userId:string):Promise<boolean> =>{
    const senderId = getUserId();
    try{
        const res = await axiosInstance.get(`/users/${userId}`);
        const user = res.data.user;
        return user.followers.includes(senderId);


    }catch(error){
        console.log(error);
        return false 
    }

};

export const followUser = async (userId: string): Promise<void> => {
    const senderId = getUserId();
    await axiosInstance.post(`/users/follow/${userId}`, { userFollowId: senderId });
};

export const unfollowUser = async (userId: string): Promise<void> => {
    const senderId = getUserId();
    await axiosInstance.post(`/users/unfollow/${userId}`, { userUnfollowId: senderId });
};