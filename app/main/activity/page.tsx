'use client';
import React, { useEffect, useState } from 'react';
import activityStyles from '../../../ui/activity/activity.module.scss';
import { fetchNotifications } from '@/store/reducers/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import ProfileImage from '@/components/ProfileImage';
import FollowBtn from '@/components/FollowBtn/FollowBtn';

const ActivityPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { notifications, status, error } = useAppSelector((state) => state.notifications);
    const [showNotifications, setShowNotifications] = useState(10);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const loadMoreNotifications = () => {
        if (showNotifications < notifications.length) {
            setShowNotifications((prev) => Math.min(prev + 10, notifications.length));
        }
    };

    const handleScroll = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const bottomPosition = document.documentElement.scrollHeight - 100;
        if (scrollPosition >= bottomPosition) {
            loadMoreNotifications();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showNotifications]);

    return (
        <div className={activityStyles.container}>
            <div className={activityStyles.title}>Activity</div>
            <div className={activityStyles.content}>
                {error && <div className={activityStyles.error}>{error}</div>}
                {notifications.length === 0 && status !== 'loading' && !error && (
                    <div>No notifications available.</div>
                )}
                {status === 'loading' && <div>Loading notifications...</div>}
                {notifications.map((notification) => (
                    <div key={notification.id} className={activityStyles.notification}>
                        <div className={activityStyles.senderInfo}>
                            <div className={activityStyles.profilePicContainer}>
                                <ProfileImage
                                    profilePic={notification.senderUserId.profilePic}
                                    altText="profile"
                                    className={activityStyles.profilePic}
                                />
                            </div>
                            <div className={activityStyles.senderName}>
                                <div className={activityStyles.sender}>
                                    {notification.senderUserId.name}
                                </div>
                                <div>{notification.description}</div>
                            </div>
                        </div>
                            <FollowBtn userId={notification.senderUserId._id}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityPage;
