'use client';
import React, { useEffect, useState } from 'react';
import style from './profile.module.scss';
import ProfileImage from '@/components/ProfileImage';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchUser } from '@/store/reducers/userSlice';
import EditProfile from '../editProfile/editProfile';

const Profile = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);

    const [name, setName] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>('');
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false); 
    const [userBio, setUserBio] = useState<string>('');

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setName(user.name || '');
                setUserName(user.username || '');
                setProfilePic(user.profilePic || '');
                setUserBio(user.bio || '');
            }
        }
    }, [users]);

   
    const handleEditProfileOpen = () => {
        setIsEditModalOpen(true);
    };

    const handleEditProfileClose = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className={style.container}>
           
            <EditProfile isOpen={isEditModalOpen} onClose={handleEditProfileClose} />

            <h1 className={style.title}>Profile</h1>

            <div className={style['profile-container']}>
                <div className={style.profile}>
                    <div className={style['profile-details']}>
                        <h1>{name}</h1>
                        <span>{username}</span>

                        <p className={style['profile-description']}>
                          {userBio}
                            </p>

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
                    <div
                        className={style['edit-button']}
                        onClick={handleEditProfileOpen}
                    >
                        Edit Profile
                    </div>
                </div>

                <div className={style['profile-stats']}>
                    <Link href={'/main/profile'}>Threads</Link>
                    <Link href={'/main/profile/replies'}>Replies</Link>
                    <Link href={'/main/profile/reposts'}>Reposts</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
