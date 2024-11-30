'use client';
import React from 'react';
import activityStyles from '../../../ui/activity/activity.module.scss';
import ProfileImage from '@/components/ProfileImage';
import { useNotifications } from '@/hooks/useNotifications';

export default function ActivityPage() {
    const { notifications, error } = useNotifications();

    if (error) {
        return <div className={activityStyles.error}>Error: {error}</div>;
    }

    return (
        <div className={activityStyles.container}>
            <h2 className={activityStyles.title}>Activity</h2>
            <div className={activityStyles.content}>
                {notifications.length === 0 ? (
                    <p>No notifications available.</p>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification._id} className={activityStyles.notification}>
                            <div className={activityStyles.senderInfo}>
                                <div className={activityStyles.profilePicContainer}>
                                    <ProfileImage
                                        profilePic={notification.senderUserId?.profilePic}
                                        altText="Profile"
                                        className={activityStyles.profilePic}
                                    />
                                </div>
                                <div className={activityStyles.senderName}>
                                    <div className={activityStyles.sender}>
                                        {notification.senderUserId?.name}
                                    </div>
                                    <div>{notification.description}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
