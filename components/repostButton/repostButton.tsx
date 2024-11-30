'use client'
import React from 'react';

import { Icons } from '@/ui/Icons/users';
import styles from './repostButton.module.scss';
import { useAppDispatch } from '@/hooks';
import { openRepost } from '@/store/modalSlice';
interface repostButtonProps {
    repostCount: number
    setPostId: (postId: string) => void

    postId: string

}
const RepostButton: React.FC<repostButtonProps> = ({ repostCount, postId, setPostId }) => {
    const dispatch = useAppDispatch();
    return (
        <button className={styles.repostButton} onClick={() => { dispatch(openRepost()); setPostId(postId) }}>
            <Icons.repost />
            <span>{repostCount}</span>
        </button>
    );
};

export default RepostButton;
