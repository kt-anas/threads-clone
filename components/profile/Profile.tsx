'use client'
import React, { useEffect, useState } from 'react'
import style from './profile.module.scss'
import ProfileImage from '@/components/ProfileImage';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchUserData } from '@/store/reducers/userSlice';
 import { fetchUser } from '@/store/reducers/userSlice';

const Profile = () => {
    const dispatch = useAppDispatch();

    const [currentUser, setCurrentUser] = useState<any[]>([]);
    const [username, setUserName] = useState<string>('');
    const { users } = useAppSelector((state) => state.users);
    const [name,setName] = useState<string>('');
    const [profilePic,setProfilePic] = useState<string>('');
  useEffect(()=>{
    dispatch(fetchUser());

  },[dispatch])

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setName(user.name || '');
                setUserName(user.username || '');
                setProfilePic(user.profilePic || '');
                
            }
        }
    }, [users]);
  
  
   
   
    
    return (
        <div className={style.container}>
            <h1 className={style.title}>Profile</h1>
            <div className={style['profile-container']}>
                <div className={style.profile}>

                    <div className={style['profile-details']}>
                        <h1>{name}</h1>
                        <span>{username}</span>
                    </div>

                    <div className={style['profile-image']}>
                        <ProfileImage
                            altText="Profile"
                            profilePic={profilePic}
                            className={style['profile-image']}
                        />
                    </div>
                </div>
                <div className={style['edit-profile']}>
                    <div className={style['edit-button']}> Edit Profile</div>
                </div>
                <div className={style['profile-stats']}>
                    <Link href={'/main/profile'}>
                        Threads
                    </Link>
                    <Link href={'/main/profile/replies'}>
                        Replies
                    </Link>

                    <Link href={'/main/profile/reposts'}>
                        Reposts
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile
