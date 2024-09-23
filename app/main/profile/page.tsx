'use client'
import React from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import style from '../../../ui/main/profile.module.scss'
import ProfileImage from '@/components/ProfileImage';
import Profile from '@/components/profile/Profile';
const ProfilePage: React.FC = () => {
    const { users } = useAppSelector((state) => state.users);
    return (
       <div>
           <p>No threads yet.</p>
        </div>
    )
}

export default ProfilePage
