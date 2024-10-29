'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../ui/main/main.module.scss';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';

import { fetchPosts } from '@/store/postsSlice';
import Threads from '@/components/threads/threads';
import { addNewPost } from '@/store/postsSlice';
import ProfileImage from '@/components/ProfileImage';
import { Icons } from '@/ui/Icons/users';
import LikeButton from '@/components/likeButton/likeButton';
import Reply from '@/components/reply/reply';
import ReplyButton from '@/components/replyButton/replyButton';
import RepostButton from '@/components/repostButton/repostButton';
import Repost from '@/components/repost/repost';
import TimeAgo from '@/components/TimeAgo';
import PostBtn from '@/components/postButton/postBtn';

import CurrentUser from '@/components/CurrentUser';
import { fetchUser } from '@/store/userSlice';
import { closeModal } from '@/store/modalSlice';
import axiosInstance from '@/axios/axiosInstance';



const HomePage: React.FC = () => {


    const { posts } = useAppSelector((state) => state.posts);


    const [currentUser, setCurrentUser] = useState<any>(null);

    const [username, setUserName] = useState<string>('');
    
    const [postId, setPostId] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userProfilePic, setProfilePic] = useState<string>('');


    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(fetchPosts());
    }, [dispatch]);


 
    const userId = localStorage.getItem('userId');  
    useEffect(() => {

       async function getCurrentUser() { 
        const response = await axiosInstance.get(`/users/${userId}`);
        setCurrentUser(response.data.user);
        setUserName(response.data.user.name);
        setUserId(response.data.user._id);
        setProfilePic(response.data.user.profilePic);
      }
      getCurrentUser();

    }, [userId]);


    useEffect(() => {
        if (currentUser) {
            setUserId(currentUser._id);
            if (currentUser.profilePic) {
                setProfilePic(currentUser.profilePic);
            } else {
                setProfilePic('https://cdn-icons-png.flaticon.com/512/149/149071.png');
            }
        }
    }, [currentUser]);



    return (
        <div>


            


            <Threads >
                <div className={styles.dp}>
                    <img
                        src={currentUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt="profile"
                        className={styles['profile-image']}
                    />
                    <p className={styles['profile-name']}>{username}</p>
                </div>

            </Threads>



            <Reply
            
                postId={postId}
                userProfilePic={userProfilePic}
                userId={userId}
                username={username}
            >
               
                <div>
                    <div>
                        
                        <img
                            src={currentUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt="profile"
                            className={styles['profile-image']}
                        />
                        
                        <p className={styles['profile-name']}>{username}</p>
                    </div>
                </div>
            </Reply>



            <p className={styles.heading}>
                For you 
                </p>


            <div className={styles["posts-container"]}>

                <div className={styles["new-container"]}>
                    <div className={styles.new}>
                        <div className={styles.dp}>
                            <ProfileImage
                                profilePic={currentUser?.profilePic}
                                altText="profile"
                                className={styles['profile-image']}
                            />
                        </div>
                        <div className={styles['new-text']}>
                            <span>What's new?</span>
                        </div>
                    </div>

                    <PostBtn />

                </div>



                <div className={styles["posts-list"]}>


                    {posts.map((post) => (

                        <div key={post._id} className={styles["post-item"]}>


                            <div className={styles["post-user"]}>
                                <img
                                    src={post.postById?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt="profile"
                                    className={styles['profile-image']}
                                />
                                <div className="text_userName">
                                    <div className={styles['user-name_time']}>
                                        <p className={styles['profile-name']}>
                                            {post.postById.username}
                                        </p>
                                        <span className={styles['time']}>
                                            <TimeAgo dateString={post.createdOn} />
                                        </span>
                                    </div>
                                    <p className={styles['post-text']}>{post.text}</p>
                                </div>
                            </div>
                            {post.image && <img src={post.image} alt="post" className={styles["post-image"]} />}

                            <div className={styles['post-icons']}>

                                <LikeButton
                                    initialLike={post.likes.length}
                                    postId={post._id}

                                    likedUsers={post.likes}
                                />


                                <div className={styles['reply']} >


                                    <ReplyButton replyCount={post.replies.length }   postId={post._id} setPostId={setPostId} />
                                </div>

                                <div>
                                    <RepostButton repostCount={post.reposts.length} postId={post._id} setPostId={setPostId}  />
                                </div>
                                 <Repost
                                    
                                    postId={postId}
                                   
                                    userProfilePic={userProfilePic}
                                    username={username}
                                />
                            </div>

                        </div>
                    ))}




                </div>
            </div>
        </div>
    );
};

export default HomePage;
