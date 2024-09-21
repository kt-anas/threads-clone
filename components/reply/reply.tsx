'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import styles from './reply.module.scss';
import axios from 'axios';

interface ReplyProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    postId: string;
    userId: string;
    userProfilePic: string;
    username: string;
}

const Reply: React.FC<ReplyProps> = ({ isOpen, onClose, children, postId, userId, userProfilePic, username }) => {
    const [post, setPost] = useState<any>(null);
    const [comment, setComment] = useState<string>('');  // State for the comment
    const [loading, setLoading] = useState<boolean>(false);  // State for loading

    // Fetch the post when the modal is opened
    useEffect(() => {
        if (isOpen) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(
                        `https://social-media-rest-apis.onrender.com/api/posts/post/${postId}`
                    );
                    setPost(response.data.post);
                } catch (error) {
                    console.error("Failed to fetch post:", error);
                }
            };
            fetchPost();
        }
    }, [isOpen, postId]);

    // Handle reply submission
    const handleReplySubmit = async () => {
        if (!comment.trim()) return;  // Avoid submitting an empty comment

        const reply = {
            text: comment,
            userId: userId,
            username: username,
            userProfilePic: userProfilePic
        };

        try {
            setLoading(true);  // Set loading state to true while submitting
            const response = await axios.post(
                `https://social-media-rest-apis.onrender.com/api/posts/${postId}/reply`, 
                reply
            );
            console.log("Replied to post:", response.data);
            setComment('');  // Clear comment input after successful submission
        } catch (error) {
            console.error("Failed to reply to post:", error);
        } finally {
            setLoading(false);  // Reset loading state after submission
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <button className={styles["close-btn"]} onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Display the fetched post content */}
                {post && (
                    <div className={styles['post-content']}>
                        <div className={styles['user-info']}>
                            {/* Display profile picture */}
                            {post.postById.profilePic ? (
                                <img 
                                    src={post.postById.profilePic} 
                                    alt={`${post.postById.username}'s profile`} 
                                    className={styles['profile-image']} 
                                />
                            ) : (
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="profile"
                                    className={styles['profile-image']}
                                />
                            )}
                            <h1>{post.postById.username}</h1>
                        </div>

                        <h2>{post.text}</h2>
                        {post.image && (
                            <img src={post.image} alt="Post" className={styles['post-image']} />
                        )}
                    </div>
                )}

                <div>{children}</div>

                <div className={styles.body}>
                    <textarea
                        placeholder="Add your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}  // Update comment state
                    />
                </div>

                <div className={styles.footer}>
                    <button 
                        className={styles['submit-btn']} 
                        onClick={handleReplySubmit}  // Trigger reply submission
                        disabled={loading}  // Disable button while loading
                    >
                        {loading ? 'Posting...' : 'Post'}  {/* Show loading state */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reply;
