'use client';
import React, { useEffect, useState } from 'react';
import styles from './FollowBtn.module.scss';
import axiosInstance from '@/axios/axiosInstance';
interface FollowBtnProps {
    userId: string;
    followers: string[];
}
const FollowBtn: React.FC<FollowBtnProps> = ({ userId, followers }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    useEffect(() => {
        const senderId = localStorage.getItem('userId');
        const fetchIsFollowing = () => {
            if (senderId) {
                setIsFollowing(followers.includes(senderId));
            } else {

                setIsFollowing(false);
            }
        };

        fetchIsFollowing();

    }, [followers]);


    const handleFollow = async () => {
        try {
            if (isFollowing) {
                const senderId = localStorage.getItem('userId');

                await axiosInstance.post(`/users/unfollow/${userId}`, { userUnfollowId: senderId });
                setIsFollowing(false);
            } else {
                const senderId = localStorage.getItem('userId');
                await axiosInstance.post(`/users/follow/${userId}`, { userFollowId: senderId });
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
