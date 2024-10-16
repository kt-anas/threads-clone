'use client'
import React, { useEffect, useState } from 'react'
import { useAppDispatch , useAppSelector} from '@/lib/hooks';
 
import { RootState } from '../store/store';

interface Props {
    setCurrentUser:(user:any)=>void
    setUserName:(username:string)=>void
    setUserId:(userId:string)=>void
    setProfilePic:(profilePic:string)=>void
    currentUser:any
}

const CurrentUser: React.FC<Props> = ({ setCurrentUser, setUserName, setUserId, setProfilePic, currentUser }) => {
    const { users } = useAppSelector((state:RootState) => state.users);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setCurrentUser(user);
                setUserName(user.username || '');
            }
        }
    }, [users]);

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
