'use client'
import React from 'react'
import { useAppSelector,useAppDispatch } from '@/hooks/useAppDispatch';

const ProfilePage:React.FC = () => {
    const { users } = useAppSelector((state) => state.users);

  return (
    <div>
      <h1>Profile</h1>

    </div>
  )
}

export default ProfilePage
