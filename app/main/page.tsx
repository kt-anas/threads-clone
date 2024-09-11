 
import React, { useEffect } from 'react'
import styles from '../ui/main/main.module.scss'
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchUser } from '@/store/reducers/userSlice'
import { fetchPosts } from '@/store/reducers/postsSlice'

const HomePage = () => {
    const dispatch = useAppDispatch();
    const { users, status } = useAppSelector((state) => state.users);
    const { posts } = useAppSelector((state) => state.posts);
    const [currentUser, setCurrentUser] = React.useState<any>(null);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {  
            const user = users.find((user) => user._id === userId);
            setCurrentUser(user);
        }
    }, [users]);


    console.log(posts.map(post =>Array.isArray(post.postById)));

    return (
        <div >
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
-                        </div>
                        <div className={styles['new-text']}>
                            <span>What's new?</span>
                        </div>
                    </div>
                    <div className={styles['past-btn']}>
                        Post
                    </div>
                </div>
                <div className={styles["posts-list"]}>
                    <div className={styles["posts-list"]}>
                        {posts.map(post => (
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
                                  <p className={styles['profile-name']}>{post.postById.username}</p>
                              </div>
                                  
                                <p>{post.text}</p>
                                {post.image && <img src={post.image} alt="post" className={styles["post-image"]} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomePage;
