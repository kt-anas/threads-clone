'use client'
import React, { useEffect, useState } from 'react'
import styles from '../ui/main/main.module.scss'
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchUser } from '@/store/reducers/userSlice'
import { fetchPosts } from '@/store/reducers/postsSlice'
import Threads from '@/components/threads'
import { addNewPost } from '@/store/reducers/postsSlice'
 

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, status } = useAppSelector((state) => state.users);
    const { posts } = useAppSelector((state) => state.posts);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUserName] = useState<string>('')
    const [postContent, setPostContent] = useState<string>('')
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            setCurrentUser(user);
            setUserName(user?.username || '')
        }
    }, [users]);

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);  
    };

    const handlePostSubmit = async () => {
        if (postContent.trim() === '') {
            alert('Please write something before posting!');
            return;
        }

        if (!currentUser) {
            alert('User not found! Please log in.');
            return;
        }

        const newPost = {
            userId: currentUser._id,
            text: postContent,
            image: null,  
        };


        dispatch(addNewPost(newPost));
        setPostContent('');
      

    };

    

    const getTimeAgo = (dateString: string) => {
        const postDate = new Date(dateString);
        const now = new Date();

        const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return `${interval} y`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return `${interval} m`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return `${interval} d`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return `${interval} h`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return `${interval} min`;
        }
        return `Just now`;
    };

    


    return (
        <div>

            <Threads isOpen={isModalOpen} onClose={closeModal}>
                <div className={styles.dp}>
                    {currentUser && currentUser.profilePic ? (
                        <img
                            src={currentUser.profilePic}
                            alt="profile"
                            className={styles['profile-image']}
                        />
                    ) : (
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="profile"
                            className={styles['profile-image']}
                        />
                    )}
                    <p className={styles['profile-name']}>{username}</p>
                </div>
                <textarea
                    name="thread"
                    id="thread"
                    placeholder="Write a post"
                    value={postContent}
                    onChange={handlePostChange}
                    className={styles['thread-textarea']}
                />
                <div className={styles['post-thread']}>
                    <button
                        className={styles['past-btn']}
                        onClick={handlePostSubmit}
                    >
                        Post
                    </button>
                </div>
            </Threads>

            <h1 className={styles.heading}>For you</h1>
            <div className={styles["posts-container"]}>
                <div className={styles["new-container"]}>
                    <div className={styles.new}>
                        <div className={styles.dp}>
                            {currentUser && currentUser.profilePic ? (
                                <img
                                    src={currentUser.profilePic}
                                    alt="profile"
                                    className={styles['profile-image']}
                                />
                            ) : (
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="profile"
                                    className={styles['profile-image']}
                                />
                            )}
                        </div>
                        <div className={styles['new-text']}>
                            <span>What's new?</span>
                        </div>
                    </div>
                    <div className={styles['past-btn']} onClick={openModal}>
                        Post
                    </div>
                </div>

                <div className={styles["posts-list"]}>
                    {posts.map((post) => (
                        <div key={post._id} className={styles["post-item"]}>
                            <div className={styles["post-user"]}>
                                {post.postById && post.postById.profilePic ? (
                                    <img
                                        src={post.postById.profilePic}
                                        alt="profile"
                                        className={styles['profile-image']}
                                    />
                                ) : (
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        alt="profile"
                                        className={styles['profile-image']}
                                    />
                                )}
                                <div className="text_userName">
                                    <div className={styles['user-name_time']}>
                                        <p className={styles['profile-name']}>
                                            {post.postById.username}

                                        </p>
                                        <span className={styles['time']}>
                                            {getTimeAgo(post.createdOn)}
                                        </span>
                                    </div>
                                    <p className={styles['post-text']}>{post.text}</p>
                                </div>
                            </div>
                            {post.image && <img src={post.image} alt="post" className={styles["post-image"]} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
