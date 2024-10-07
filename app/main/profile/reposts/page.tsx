'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import axios from 'axios'; // Missing axios import
import styles from '../../../../ui/main/main.module.scss';

const Reposts: React.FC = () => {
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

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : posts.length > 0 ? (
                posts.map((post) =>
                    post.reposts && post.reposts.length > 0 ? (
                        <div key={post._id} className={styles['repost-item']}>
                            <h2>{post.username} reposted:</h2>
                            <p>{post.text}</p>
                            {post.image && <img src={post.image} alt="Repost" className={styles['repost-image']} />}
                        </div>
                    ) : null
                )
            ) : (
                <p>No reposts available</p>
            )}
        </div>
    );
};

export default Reposts;
