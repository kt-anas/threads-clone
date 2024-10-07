'use client';
import React, { useState, useEffect } from 'react';
import styles from './FollowBtn.module.scss';
import axiosInstance from '@/axios/axiosInstance';

interface FollowBtnProps {
    onClick: () => void;

}

const FollowBtn: React.FC<FollowBtnProps> = ({ onClick }) => {

    return (
        <div>

        </div>
        //     onClick={onClick}
        //     className={`${styles['follow-btn']} ${isFollowing ? styles['follow-btn--unfollow'] : styles['follow-btn--follow']
        //         }`}
        // >
        //     {isFollowing ? 'Unfollow' : 'Follow'}
        // </div>
    );
};

export default FollowBtn;
