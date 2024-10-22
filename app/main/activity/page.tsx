import React from 'react';
import activityStyles from '../../../ui/activity/activity.module.scss';
import ProfileImage from '@/components/ProfileImage';
import FollowBtn from '@/components/FollowBtn/FollowBtn';
import axiosInstance from '@/axios/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getUserId } from '@/store/reducers/userSlice';
import useUserId from '@/lib/hooks/userId';

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePic: string;
}

interface Notification {
    id: string;
    description: string;
    senderUserId: User;
}

interface ActivityPageProps {
    notifications: Notification[];
    error: string | null;
}
 

const getNotifications = async () => {
    

    const res = await axiosInstance.get(`/users/notification/${userId}`);
    return res.data
}




export default async function ActivityPage() {

    const data = await getNotifications();
    console.log(data, 'this post')


    return (
        <div className={activityStyles.container}>
            {/* <div className={activityStyles.title}>Activity</div>    
            <div className={activityStyles.content}>
               
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
                        <FollowBtn userId={notification.senderUserId._id} />
                    </div>
                ))}
            </div> */}
        </div>
    );
};




