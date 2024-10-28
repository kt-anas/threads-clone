'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import ProfileImage from '@/components/ProfileImage';
// import { fetchPostByUserId } from '@/store/reducers/postSlice';
import styles from '../../../ui/main/main.module.scss';
import TimeAgo from '@/components/TimeAgo';
import style from '../../../ui/main/profile.module.scss';
import axiosInstance from '@/axios/axiosInstance';
import { Icons } from '@/ui/Icons/users';
import LikeButton from '@/components/likeButton/likeButton';
import ReplyButton from '@/components/replyButton/replyButton';
import RepostButton from '@/components/repostButton/repostButton';
import DropdownMenu from '@/components/DropdowMenu';
import styleMenu from '@/components/DropdowMenu.module.scss';

const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

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
                const response = await axiosInstance.get(`/posts/${userId}`);
                setPosts(response.data.post);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (postId: string) => {
        try {
            await axiosInstance.delete(`/posts/${postId}`);
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const toggleDropdown = (postId: string) => {
        setSelectedPostId(selectedPostId === postId ? null : postId);
    };

    return (
        <div className={styles['post-list']}>
            {posts.map((post) => (
                <div key={post._id} className={styles['post-item']}>
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
                        <div className={styleMenu['menu-container']}>
                            <Icons.circleMenu className={styleMenu['menu']} onClick={() => toggleDropdown(post._id)} />
                            {selectedPostId === post._id && (
                                <DropdownMenu>
                                    <button onClick={() => deletePost(post._id)}>Delete</button>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                    <p className={styles['post-text']}>{post.text}</p>
                    {post.image && <img src={post.image} alt="post" className={styles['post-image']} />}
                    <div className={style['post-actions-container']}>
                        <LikeButton
                            initialLike={post.likes.length}
                            postId={post._id}
                           
                            likedUsers={post.likes}
                        />
                        <ReplyButton
                            replyCount={post.replies.length}
                            
                            postId={post._id}
                            setPostId={setSelectedPostId}
                        />
                        <RepostButton
                            repostCount={post.reposts.length}
                            postId={post._id}
                            setPostId={setSelectedPostId}
                            
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfilePage;
