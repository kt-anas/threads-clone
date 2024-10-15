 
import React, { useState } from 'react';
import styles from '../../ui/main/main.module.scss';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchUser } from '@/store/reducers/userSlice';
import { fetchPosts } from '@/store/reducers/postsSlice';
import Threads from '@/components/threads/threads';
import { addNewPost } from '@/store/reducers/postsSlice';
import ProfileImage from '@/components/ProfileImage';
import { Icons } from '@/ui/Icons/users';
import LikeButton from '@/components/likeButton/likeButton';
import Reply from '@/components/reply/reply';
import ReplyButton from '@/components/replyButton/replyButton';
import RepostButton from '@/components/repostButton/repostButton';
import Repost from '@/components/repost/repost';
import TimeAgo from '@/components/TimeAgo';
import PostBtn from '@/components/postButton/postBtn';
import FetchUser from '@/components/FetchUser';
import CurrentUser from '@/components/CurrentUser';



const HomePage: React.FC = () => {

    // const { users } = useAppSelector((state) => state.users);
    const { posts } = useAppSelector((state) => state.posts);


    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUserName] = useState<string>('');
    const [postContent, setPostContent] = useState<string>('');
    const [postImage, setPostImage] = useState<any>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [isRepostOpen, setIsRepostOpen] = useState(false);
    const [postId, setPostId] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userProfilePic, setProfilePic] = useState<string>('');



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openComment = () => setIsCommentOpen(true);
    const closeComment = () => setIsCommentOpen(false);

    const openRepost = () => setIsRepostOpen(true);
    const closeRepost = () => setIsRepostOpen(false);


    return (
        <div>

            <FetchUser />
            <CurrentUser setCurrentUser={setCurrentUser} setUserName={setUserName} setUserId={setUserId} setProfilePic={setProfilePic} currentUser={currentUser} />
            <Threads isOpen={isModalOpen} onClose={closeModal}>
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

                    <PostBtn onClick={openModal} />

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
                                {currentUser ? (
                                    <LikeButton
                                        initialLike={post.likes.length}
                                        postId={post._id}
                                        userId={currentUser._id}
                                        likedUsers={post.likes}
                                    />
                                ) : (
                                    <p>login</p>
                                )}

                                <div className={styles['reply']} >


                                    <ReplyButton replyCount={post.replies.length} openComment={openComment} postId={post._id} setPostId={setPostId} />
                                </div>

                                <div>
                                    <RepostButton repostCount={post.reposts.length} postId={post._id} setPostId={setPostId} opernRepost={openRepost} />
                                </div>




                                <Repost
                                    isOpen={isRepostOpen}
                                    onClose={closeRepost}
                                    postId={postId}
                                    userId={userId}
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
