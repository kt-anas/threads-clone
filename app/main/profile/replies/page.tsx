'use client';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch'; // Import both hooks correctly
import axios from 'axios';
import styles from '../../../../ui/main/main.module.scss';

const Replies: React.FC = () => {
    const { posts: reduxPosts } = useAppSelector((state) => state.post);  // Renamed to avoid conflict
    const dispatch = useAppDispatch();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    type Post = {
        _id: string;
        userProfilePic: string;
        username: string;
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
        userProfilePic: string;
        username: string;
        text: string;
    };

    // Fetch the posts
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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post) =>
                    post.replies
                        && post.replies
                            .length > 0 ? (
                        <div key={post._id} className={styles['reply-item']}>
                            <h2>{post.username} replied:</h2>
                            {post.replies.map((reply) => (
                                <div key={reply._id} className={styles['reply-content']}>
                                    <h4>{reply.username}</h4>
                                    <p>{reply.text}</p>
                                    {reply.userProfilePic && (
                                        <img src={reply.userProfilePic} alt={reply.username} className={styles['reply-image']} />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : null
                )
            ) : (
                <p>No replies available</p>
            )}
        </div>
    );
};

export default Replies;
