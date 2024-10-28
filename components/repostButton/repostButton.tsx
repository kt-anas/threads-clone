'use client'
import React from 'react';

import { Icons } from '@/ui/Icons/users';
import styles from './repostButton.module.scss';
import { useAppDispatch } from '@/lib/hooks';
import { openRepost } from '@/store/modalSlice';
interface repostButtonProps {
    repostCount: number
    setPostId: (postId: string) => void
    
    postId: string

}
const RepostButton: React.FC<repostButtonProps> = ({ repostCount, postId}) => {
    const dispatch = useAppDispatch();
    return (
        <button className={styles.repostButton} onClick={() => { dispatch(openRepost());  }}>
            <Icons.repost />
            <span>{repostCount}</span>
        </button>
    );
};

export default RepostButton;
