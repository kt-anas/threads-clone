// hooks/useNotifications.ts
import { useState, useEffect } from 'react';
import axiosInstance from '@/axios/axiosInstance';

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

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('User ID not found');
                return;
            }
            try {
                const res = await axiosInstance.get(`/users/notification/${userId}`);
                setNotifications(res.data.notifications);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch notifications');
            }
        };
        fetchNotifications();
    }, []);

    return { notifications, error };
};
