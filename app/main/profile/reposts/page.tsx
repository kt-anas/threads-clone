'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import axios from 'axios'; 
import style from '../../../../ui/profile/repost.module.scss';
import ProfileImage from '@/components/ProfileImage';
import axiosInstance from '@/axios/axiosInstance';

const Reposts: React.FC = () => {
    const dispatch = useAppDispatch();
    const [posts, setPosts] = useState<Post[]>([]);
     

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

 
    const fetchPosts = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await axiosInstance.get(
                    `/posts/${userId}`
                );
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
        <div className={style['repost-container']}>
            {  posts.length > 0 ? (
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
