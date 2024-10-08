'use client';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import axios from 'axios';
import styles from '../../../../ui/profile/reply.module.scss';
import ProfileImage from '@/components/ProfileImage';

const Replies: React.FC = () => {
    const { posts: reduxPosts } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    type User = {
        _id: string;
        username: string;
        userProfilePic: string;
    };
    type Post = {
        _id: string;
        userProfilePic: string;
        username: string;
        postById: User;

        text: string;
        image: string;
        createdOn: string;
        replies: Reply[];
        likes: string[];
        reposts: string[];
    };

    type Reply = {
        _id: string;
        userId: string;
        image: string;
        userProfilePic: string;
        username: string;
        text: string;
    };

    
    const fetchPosts = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await axios.get(
                    `https://social-media-rest-apis.onrender.com/api/posts/${userId}`
                );
                setPosts(response.data.post);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to load posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <p className={styles['loading-text']}>Loading...</p>;
    }

    if (error) {
        return <p className={styles['error-text']}>{error}</p>;
    }
  
    
    return (
        <div className={styles['replies-container']}>
            {posts.length > 0 ? (
                posts.map((post) =>
                    post.replies && post.replies.length > 0 ? (
                        <div key={post._id} className={styles['reply-item']}>
                            <ProfileImage profilePic={post.userProfilePic} className={styles['post-userProfilePic']} />
                            <h2 className={styles['post-username']}>{post.postById.username}</h2>
                            {post.replies && <img src={post.image} alt="" className={styles['post-image']} />}
                            {post.replies.map((reply) => (
                                <div key={reply._id} className={styles['reply-content']}>
                                    <div className={styles['reply-user-info']}>
                                        {reply.userProfilePic && (
                                            <ProfileImage profilePic={reply.userProfilePic} className={styles['reply-userProfilePic']} />
                                        )}
                                        <h4 className={styles['reply-username']}>{reply.username}</h4>
                                    </div>
                                    <p className={styles['reply-text']}>{reply.text}</p>
                                </div>
                            ))}
                        </div>
                    ) : null
                )
            ) : (
                <p className={styles['no-replies']}>No replies available</p>
            )}
        </div>
    );
};

export default Replies;
