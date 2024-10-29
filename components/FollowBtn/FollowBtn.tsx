'use client'; 
import React, { useEffect, useState } from 'react';
import styles from './FollowBtn.module.scss';
import axiosInstance from '@/axios/axiosInstance';
import { getUserId } from '@/lib/utils/getCookie';
 
interface FollowBtnProps {
    userId: string;
}

const FollowBtn: React.FC<FollowBtnProps> = ({ userId }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        const fetchFollowingStatus = async () => {
            const status = await getFollowStatus(userId);
            setIsFollowing(status);
        }; 

        fetchFollowingStatus();
    }, [userId]);  

    const getFollowStatus = async (userId: string): Promise<boolean> => {
        const senderId = localStorage.getItem('userId');  
        try {
            const res = await axiosInstance.get(`/users/${userId}`);
            const user = res.data.user;
            return user.followers.includes(senderId);
        } catch (error) {
            console.error(error);
            return false; 
        }
    };

    const followUser = async (userId: string): Promise<void> => {
        const senderId = localStorage.getItem('userId');  
        await axiosInstance.post(`/users/follow/${userId}`, { userFollowId: senderId });
    };

    const unfollowUser = async (userId: string): Promise<void> => {
        const senderId = localStorage.getItem('userId');  
        await axiosInstance.post(`/users/unfollow/${userId}`, { userUnfollowId: senderId });
    };


    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await unfollowUser(userId);
                setIsFollowing(false);  
            } else {
                await followUser(userId);
                setIsFollowing(true);  
            }
        } catch (error) {
            console.error(error);
            
        }
    };

    return (
        <button onClick={handleFollow} className={styles['follow-btn']}>
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    );
};

export default FollowBtn;
