'use client';
import React, { useState } from 'react';
import styles from './RepostModal.module.scss';
 
import axiosInstance from '@/axios/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeRepost } from '@/store/modalSlice';

interface RepostProps {
    
   
    postId: string;
    userProfilePic: string;
    userId: string;
    username: string;
}

const Repost: React.FC<RepostProps> = ({ postId, userProfilePic, userId, username }) => {
    const dispatch = useAppDispatch();
    const isRepostOpen  = useAppSelector((state) => state.modal.isRepostOpen);
    
    const handleRepost = async () => {
       
        const repost = {
            userId: userId,
            userProfilePic: userProfilePic,
            username: username
        };
       

        try {
            
            const response = await axiosInstance.post(`/posts/repost/${postId}`, repost );
            postId = '';
           
          
             dispatch(closeRepost());
        } catch (err) {
            console.error("Failed to repost:", err);
            
            
        }
    };

    if (!isRepostOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={ ()=> dispatch(closeRepost())}>
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
