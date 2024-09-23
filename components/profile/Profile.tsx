import React from 'react'
import style from './profile.module.scss'
import ProfileImage from '@/components/ProfileImage';
import Link from 'next/link';

const Profile = () => {
  return (
    <div className={style.container}>
            <h1 className={style.title}>Profile</h1>
            <div className={style['profile-container']}>
                <div className={style.profile}>
                    <div className={style['profile-details']}>
                        <h1>Namejj</h1>
                        <span>UserName</span>
                    </div>
                    <div className={style['profile-image']}>
                        <ProfileImage
                            altText="Profile"
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
