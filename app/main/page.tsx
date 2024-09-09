'use client'
import React, { useEffect } from 'react'
import styles from '../ui/main/main.module.scss'
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchUser } from '@/store/reducers/userSlice'

const HomePage = () => {
    const dispatch = useAppDispatch();
    const { users, status } = useAppSelector((state) => state.users);
    const [currentUser, setCurrentUser] = React.useState<any>(null);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            setCurrentUser(user);
        }
    }, [users]);

    return (
        <div>
            <h1 className={styles.heading}>For You</h1>
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
                    <div className={styles['past-btn']}>
                        Post
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
