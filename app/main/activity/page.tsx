
import React from 'react';
import activityStyles from '../../../ui/activity/activity.module.scss';
import ProfileImage from '@/components/ProfileImage';
import FollowBtn from '@/components/FollowBtn/FollowBtn';
import axiosInstance from '@/axios/axiosInstance';
import { getUserId } from '@/lib/utils/getCookie';

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePic: string;
}

interface Notification {
    _id: string;
    description: string;
    senderUserId: User;
}

async function getNotifications() {
    const userId = getUserId();
    const res = await axiosInstance.get(`/users/notification/${userId}`);
    return res.data.notifications;
}

export default async function ActivityPage() {
    let notifications: Notification[] = [];
    try {
        notifications = await getNotifications();
        console.log(notifications)
    } catch (error) {
        console.error(error);

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
                                        profilePic={notification.senderUserId.profilePic}
                                        altText="Profile"
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
                            <FollowBtn userId={notification.senderUserId._id} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
