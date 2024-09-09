'use client'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchUserById } from '@/store/reducers/currentUserSlice'
import styles from '../ui/main/main.module.scss'

const HomePage = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(state => state.user.currentUser);
    const userStatus = useAppSelector(state => state.user.status);
    const userError = useAppSelector(state => state.user.error);

    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userStatus === 'idle' && userId) {
            dispatch(fetchUserById(userId));
        }
    });

    console.log(typeof(currentUser?.profilePic), 'current user profile pic');
    

    return (
        <div>
            <h1 className={styles.heading}>For You</h1>
            <div className={styles["posts-container"]}>
                <div className={styles["new-container"]}>
                    <div className={styles.new}>
                        <div className={styles.dp}>
                            {currentUser && currentUser.profilePic
                                ? (
                                    <img
                                        src={currentUser.profilePic
                                        }
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
    )
}

export default HomePage
