'use server';

import axiosInstance from "@/axios/axiosInstance";

export async function fetchPostsAll() {

    try{
        const res = await axiosInstance.get('/posts');
        return res.data;
    } catch (error) {
        console.log(error);
    }

}