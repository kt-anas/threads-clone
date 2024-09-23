'use client';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import style from '../../../ui/main/profile.module.scss';
import ProfileImage from '@/components/ProfileImage';
import { fetchPostByUserId } from '@/store/reducers/postSlice';
import styles from '../../../ui/main/main.module.scss';
import TimeAgo from '@/components/TimeAgo';

const ProfilePage: React.FC = () => {
    const { posts } = useAppSelector((state) => state.post); 
    const dispatch = useAppDispatch();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(fetchPostByUserId(userId));
        }
    }, [dispatch]);

    console.log(posts);
    return (
        <div className={styles['post-list']}>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className={styles["post-item"]}>
                        <div className={styles['post-user']}>
                            <ProfileImage
                                profilePic={post.userProfilePic}
                                altText="Profile"
                                className={styles['profile-image']}
                            />
                            <div className={styles['post-details']}>
                                <h3>{post.username}</h3>
                                <TimeAgo dateString={post.createdAt} />
                            </div>
                        </div>
                        <p className={styles['post-text']}>{post.text}</p>
                        {post.image && (
                            <img src={post.image} alt="post" className={styles["post-image"]} />
                        )}
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
}

export default ProfilePage;
