'use client';
import React, { useState } from 'react';
import styles from './RepostModal.module.scss';

import axiosInstance from '@/axios/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { closeRepost } from '@/store/modalSlice';
import { fetchPosts } from '@/store/postsSlice';

interface RepostProps {


    postId: string;
    userProfilePic: string;
    username: string;
}

const Repost: React.FC<RepostProps> = ({ postId, userProfilePic, username }) => {
    const dispatch = useAppDispatch();
    const isRepostOpen = useAppSelector((state) => state.modal.isRepostOpen);

    const handleRepost = async () => {
        const userId = localStorage.getItem('userId');
        const repost = {
            userId: userId,
            userProfilePic: userProfilePic,
            username: username
        };


        try {

            const response = await axiosInstance.post(`/posts/repost/${postId}`, repost);
            postId = '';


            dispatch(closeRepost());
            dispatch(fetchPosts());
        } catch (err) {
            console.error("Failed to repost:", err);


        }
    };

    if (!isRepostOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={() => dispatch(closeRepost())}>
            <div className={styles.modalContent}>

                <div className={styles.modalActions}>

                    <button className={styles.repostButton} onClick={handleRepost}  >
                        Repost
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Repost;
