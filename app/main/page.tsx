'use client'
import React, { useEffect } from 'react'
import styles from '../ui/main/main.module.scss'
import { useAppSelector } from '@/hooks/useAppDispatch'
import { useState } from 'react'
const HomePage = () => {
    const {users} = useAppSelector((state) => state.users);
   
    const [currentUser, setCurrentUser] = useState<any>(null);
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const user = users.find((user) => user._id === userId);
            setCurrentUser(user);
        }
    });
     
    return (
        <div>
            <h1 className={styles.heading}>For You</h1>
            <div className={styles["posts-container"]}>
                <div className={styles["new-container"]}>
                <div className={styles.new}>
                    <div className={styles.dp}>
                        {currentUser &&  currentUser.profilePic ? (
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
    )
}

export default HomePage
