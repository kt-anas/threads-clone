import React, { useState } from 'react';
import styles from './RepostModal.module.scss';
import axios from 'axios';
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRepost = async () => {
        // setLoading(true);
        setError(null);

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
            setLoading(false);
            onClose();
        } catch (err) {
            console.error("Failed to repost:", err);
            setError("Failed to repost. Please try again.");
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>


                {error && <p className={styles.errorMessage}>{error}</p>}

                <div className={styles.modalActions}>
                    <button className={styles.cancelButton} onClick={onClose} disabled={loading}>Cancel</button>
                    <button className={styles.repostButton} onClick={handleRepost} disabled={loading}>
                        {loading ? 'Reposting...' : 'Repost'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Repost;
