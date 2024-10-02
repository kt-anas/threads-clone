'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
// import style from '../../../ui/main/profile.module.scss';
import ProfileImage from '@/components/ProfileImage';
import { fetchPostByUserId } from '@/store/reducers/postSlice';
import styles from '../../../ui/main/main.module.scss';
import TimeAgo from '@/components/TimeAgo';
import style from '../../../ui/main/profile.module.scss';
import axios from 'axios';
import { Icons } from '@/ui/Icons/users';

const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [posts, setPosts] = useState<any>([]);


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
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(posts);

    return (
        <div className={styles['post-list']}>
            {posts.length > 0 ? (
                posts.map((post: { _id: string; userProfilePic: string; username: string; text: string; image: string; createdOn: string; replies: any[] }) => (
                    <div key={post._id} className={styles["post-item"]}>
                        <div className={styles['post-user']}>
                            <ProfileImage
                                profilePic={post.userProfilePic}
                                altText="Profile"
                                className={styles['profile-image']}
                            />
                            <div className={styles['post-details']}>
                                <h3>{post.username}</h3>
                                <TimeAgo dateString={post.createdOn} />
                            </div>
                            <Icons.circleMenu className={styles['menu']} />
                        </div>
                        <p className={styles['post-text']}>{post.text}</p>
                        {post.image && (
                            <img src={post.image} alt="post" className={styles["post-image"]} />
                        )}
                        <div className={styles["post-actions"]}>
                            {post.replies && post.replies.length > 0 && (
                                <div className={style["replies-section"]}>
                                  
                                    {post.replies.map((reply:{  text: string,_id: string ,userId: string,userProfilePic: string, username: string}) => (
                                        <div key={reply._id} className={style["reply-item"]}>
                                           <div className={style["reply-user"]}>
                                           <ProfileImage profilePic={reply.userProfilePic} altText="Profile" className={styles['profile-image']} />
                                           <h5>{reply.username}</h5>
                                           </div>
                                            <p>{reply.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
}

export default ProfilePage;
