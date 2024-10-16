'use client';
import React, { useState } from 'react';
import styles from './RepostModal.module.scss';
 
import axiosInstance from '@/axios/axiosInstance';

interface RepostProps {
    isOpen: boolean;
    onClose: () => void;
    postId: string;
    userProfilePic: string;
    userId: string;
    username: string;
}

const Repost: React.FC<RepostProps> = ({ isOpen, onClose, postId, userProfilePic, userId, username }) => {
    
    const handleRepost = async () => {
       
       

        const repost = {
            userId: userId,
            userProfilePic: userProfilePic,
            username: username
        };
       

        try {
            console.log('this is a post id', postId);
            const response = await axiosInstance.post(`/posts/repost/${postId}`, repost
            );
            postId = '';
            console.log("Reposted:", response.data);
          
            onClose();
        } catch (err) {
            console.error("Failed to repost:", err);
            
            
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
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
