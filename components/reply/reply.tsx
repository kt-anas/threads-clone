'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import styles from './reply.module.scss';
 
import ProfileImage from '../ProfileImage';
import axiosInstance from '@/axios/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeComment } from '@/store/modalSlice';

interface ReplyProps {
   
    children: ReactNode;
    postId: string;
    userId: string;
    userProfilePic: string;
    username: string;
}

const Reply: React.FC<ReplyProps> = ({  children, postId, userId, userProfilePic, username }) => {

    const [post, setPost] = useState<any>(null);
    const [comment, setComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();  
  const  isCommentOpen = useAppSelector((state) => state.modal.isCommentOpen);
    useEffect(() => {
        if (isCommentOpen) {
            const fetchPost = async () => {
                try {
                    const response = await axiosInstance.get(
                        `/posts/post/${postId}`
                    );
                    setPost(response.data.post);
                   
                } catch (error) {
                    console.error("error", error);
                }
            };
            fetchPost();
        }
    }, [ isCommentOpen, postId]);


    const handleReplySubmit = async () => {
        if (!comment.trim()) return;

        const reply = {
            text: comment,
            userId: userId,
            username: username,
            userProfilePic: userProfilePic
        };

        try {
            setLoading(true);   
            const response = await axiosInstance.post(
                `/posts/${postId}/reply`,
                reply
            );
            setLoading(false); 

            setComment('');  
          

          dispatch(closeComment());
        } catch (error) {
            console.error( error);
        }   
        
    };



    if (!isCommentOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <button className={styles["close-btn"]} onClick={() => dispatch(closeComment())}>
                        &times;
                    </button>
                </div>
                {post && (
                    <div className={styles['post-content']}>
                        <div className={styles['user-info']}>

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

                            <div>
                                <p>{post.postById.username}</p>
                                <p>{post.text}</p>
                            </div>
                        </div>
                        <div className={styles['the-line']}>

                        </div>
                        {post.image && (
                            <div className={styles['post-image-container']}>
                                <img src={post.image} alt="Post" className={styles['post-image']} />

                            </div>
                        )}
                    </div>
                )}

                <div className={styles.user}>
                    {children}
                    </div>

                <div className={styles.body}>
                    <textarea
                        placeholder="Add your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className={styles.footer}>
                    <button
                        className={styles['submit-btn']}
                        onClick={handleReplySubmit}
                        disabled={loading}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
                <div className={styles.repliesContainer}>
                    {post?.replies?.length > 0 ? (
                       [...post.replies].reverse().map((reply: any, index: number) => (
                            <div key={index} className={styles.reply}>
                                <div className={styles['reply-user-info']}>
                                    <ProfileImage profilePic={reply.userProfilePic
                                    }
                                        altText={reply.username}
                                        className={styles['profile-image']}
                                    />
                                    <div className={styles['reply-info']}>
                                        <p>{reply.username}</p>
                                        <p>{reply.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No replies yet.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Reply;
