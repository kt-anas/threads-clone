'use client'
import React, { useEffect, useState } from 'react'
 
import axiosInstance from '@/axios/axiosInstance';

interface Props {
    setCurrentUser:(user:any)=>void
    setUserName:(username:string)=>void
    setUserId:(userId:string)=>void
    setProfilePic:(profilePic:string)=>void
    currentUser:any
}

const CurrentUser: React.FC<Props> = ({ setCurrentUser, setUserName, setUserId, setProfilePic, currentUser }) => {
 
    const userId = localStorage.getItem('userId');  
    useEffect(() => {

       async function getCurrentUser() { 
        const response = await axiosInstance.get(`/users/${userId}`);
        setCurrentUser(response.data.user);
        setUserName(response.data.user.name);
        setUserId(response.data.user._id);
        setProfilePic(response.data.user.profilePic);
      }
      getCurrentUser();

    }, [userId]);


    useEffect(() => {
        if (currentUser) {
            setUserId(currentUser._id);
            if (currentUser.profilePic) {
                setProfilePic(currentUser.profilePic);
            } else {
                setProfilePic('https://cdn-icons-png.flaticon.com/512/149/149071.png');
            }
        }
    }, [currentUser]);
  return null
}

export default CurrentUser
