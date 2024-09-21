'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../ui/main/main.module.scss';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchUser } from '@/store/reducers/userSlice';
import { fetchPosts } from '@/store/reducers/postsSlice';
import Threads from '@/components/threads/threads';
import { addNewPost } from '@/store/reducers/postsSlice';
import ProfileImage from '@/components/ProfileImage';
import { Icons } from '@/ui/Icons/users';
import LikeButton from '@/components/likeButton';
import Replay from '@/components/reply/reply';
import ReplyButton from '@/components/replyButton';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const { posts } = useAppSelector((state) => state.posts);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUserName] = useState<string>('');
    const [postContent, setPostContent] = useState<string>('');
    const [postImage, setPostImage] = useState<any>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [postId, setPostId] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userProfilePic, setProfilePic] = useState<string>('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openComment = () => setIsCommentOpen(true);
    const closeComment = () => setIsCommentOpen(false);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setCurrentUser(user);
                setUserName(user.username || '');
            }
        }
    }, [users]);

    useEffect(() => {
        if (currentUser) {
            setUserId(currentUser._id);
            setProfilePic(currentUser.profilePic);
        }
    }, [currentUser]); // Only run when currentUser changes

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPostImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
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
            image: postImage,
        };

        dispatch(addNewPost(newPost));
        setPostContent('');
    };

    const getTimeAgo = (dateString: string) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) return `${interval} y`;
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return `${interval} m`;
        interval = Math.floor(seconds / 86400);
        if (interval > 1) return `${interval} d`;
        interval = Math.floor(seconds / 3600);
        if (interval > 1) return `${interval} h`;
        interval = Math.floor(seconds / 60);
        if (interval > 1) return `${interval} min`;
        return `Just now`;
    };

    return (
        <div>
            {/* New thread modal */}
            <Threads isOpen={isModalOpen} onClose={closeModal}>
                <div className={styles.dp}>
                    <img
                        src={currentUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt="profile"
                        className={styles['profile-image']}
                    />
                    <p className={styles['profile-name']}>{username}</p>
                </div>
                <div className={styles['thread']}>
                    <textarea
                        name="thread"
                        id="thread"
                        placeholder="Write a post"
                        value={postContent}
                        onChange={handlePostChange}
                        className={styles['thread-textarea']}
                    />
                    {preview && (
                        <div className={styles['image-preview-container']}>
                            <img src={preview} alt="Preview" className={styles['image-preview']} />
                        </div>
                    )}
                    <div className={styles['file-upload-container']}>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles['file-input']}
                        />
                        <label htmlFor="file-upload" className={styles['file-upload-label']}>
                            <Icons.image />
                        </label>
                    </div>
                </div>
                <div className={styles['post-thread']}>
                    <button
                        className={styles['past-btn']}
                        onClick={handlePostSubmit}
                    >
                        Post
                    </button>
                </div>
            </Threads>

            {/* Reply modal */}
            <Replay
                isOpen={isCommentOpen}
                onClose={closeComment}
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
            </Replay>

            <h1 className={styles.heading}>For you</h1>
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
                    <div className={styles['past-btn']} onClick={openModal}>
                        Post
                    </div>
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
                                            {getTimeAgo(post.createdOn)}
                                        </span>
                                    </div>
                                    <p className={styles['post-text']}>{post.text}</p>
                                </div>
                            </div>
                            {post.image && <img src={post.image} alt="post" className={styles["post-image"]} />}
                            <div className={styles['post-icons']}>
                                {currentUser ? (
                                    <LikeButton
                                        initialLike={post.likes.length}
                                        postId={post._id}
                                        userId={currentUser._id}
                                        likedUsers={post.likes}
                                    />
                                ) : (
                                    <p>Please log in to like this post</p>
                                )}

                                <div className={styles['reply']} onClick={() => {
                                    openComment();
                                    setPostId(post._id);
                                }}>
                                    <ReplyButton replyCount={post.replies.length}/>
                                </div> 
                                
                                <Icons.repost />
                                <Icons.share />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
