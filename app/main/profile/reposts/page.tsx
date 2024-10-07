'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import axios from 'axios'; 
import style from '../../../../ui/profile/repost.module.scss';
import ProfileImage from '@/components/ProfileImage';

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
        <div className={style['repost-container']}>
            {loading ? (
                <p className={style['loading-text']}>Loading...</p>
            ) : error ? (
                <p className={style['error-text']}>{error}</p>
            ) : posts.length > 0 ? (
                posts.map((post) =>
                    post.reposts && post.reposts.length > 0 ? (
                        <div key={post._id} className={style['repost-item']}>
                            <div className={style['user-info']}>
                                <ProfileImage  profilePic={post.userProfilePic} className={style['profile-pic']} />
                                <h2 className={style['username']}>{post.username}</h2>
                            </div>
                            <p className={style['repost-text']}>{post.text}</p>
                            {post.image && <img src={post.image} alt="Repost" className={style['repost-image']} />}
                        </div>
                    ) : null
                )
            ) : (
                <p className={style['no-reposts']}>No reposts available</p>
            )}
        </div>
    );
};

export default Reposts;
