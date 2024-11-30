'use client';
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/axios/axiosInstance';
import Image from 'next/image';
import styles from '../../../../ui/profile/reply.module.scss';
import ProfileImage from '@/components/ProfileImage';

const Replies: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

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
                const response = await axiosInstance.get(`/posts/${userId}`);
                setPosts(response.data.post);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className={styles['replies-container']}>
            {posts.length > 0 ? (
                posts.map((post) =>
                    post.replies && post.replies.length > 0 ? (
                        <div key={post._id} className={styles['reply-item']}>
                            <ProfileImage
                                profilePic={post.userProfilePic}
                                className={styles['post-userProfilePic']}
                            />
                            <h2 className={styles['post-username']}>
                                {post.postById.username}
                            </h2>
                            {post.image && (
                                <Image
                                    src={post.image}
                                    alt="Post Image"
                                    className={styles['post-image']}
                                    width={500}
                                    height={300}
                                    priority
                                />
                            )}
                            {post.replies.map((reply) => (
                                <div key={reply._id} className={styles['reply-content']}>
                                    <div className={styles['reply-user-info']}>
                                        {reply.userProfilePic && (
                                            <ProfileImage
                                                profilePic={reply.userProfilePic}
                                                className={styles['reply-userProfilePic']}
                                            />
                                        )}
                                        <h4 className={styles['reply-username']}>
                                            {reply.username}
                                        </h4>
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
