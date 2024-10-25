'use client'; 
import React, { useEffect, useState } from 'react';
import styles from './FollowBtn.module.scss';
import { FollowStatus, followUser, unfollowUser } from '@/lib/utils/follow';

interface FollowBtnProps {
    userId: string;
}

const FollowBtn: React.FC<FollowBtnProps> = ({ userId }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

   
    useEffect(() => {
        const FollowingStatus = async () => {
            const status = await FollowStatus(userId);
            setIsFollowing(status);
        }; 

        FollowingStatus();
    }, []);


    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await unfollowUser(userId);
                setIsFollowing(false);
            } else {
                await followUser(userId);
                setIsFollowing(true);
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <button onClick={handleFollow} className={styles['follow-btn']}>
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    );
};

export default FollowBtn;
