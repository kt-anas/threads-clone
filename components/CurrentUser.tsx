'use client';
import React, { useEffect } from 'react';
import axiosInstance from '@/axios/axiosInstance';

interface Props {
    setCurrentUser: (user: any) => void;
    setUserName: (username: string) => void;
    setUserId: (userId: string) => void;
    setProfilePic: (profilePic: string) => void;
    currentUser: any;
}

const CurrentUser: React.FC<Props> = ({ setCurrentUser, setUserName, setUserId, setProfilePic, currentUser }) => {
    const userId = localStorage.getItem('userId');  

    useEffect(() => {
        async function getCurrentUser() {
            if (!userId) return;  
            try {
                const response = await axiosInstance.get(`/users/${userId}`);
                setCurrentUser(response.data.user);
                setUserName(response.data.user.name);
                setUserId(response.data.user._id);
                setProfilePic(response.data.user.profilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png');
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        }
        getCurrentUser();
    }, [userId, setCurrentUser, setUserName, setUserId, setProfilePic]);

    useEffect(() => {
        if (currentUser) {
            setUserId(currentUser._id);
            setProfilePic(currentUser.profilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png');
        }
    }, [currentUser, setUserId, setProfilePic]);

    return null;
};

export default CurrentUser;
