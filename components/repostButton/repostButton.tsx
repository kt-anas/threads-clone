'use client'
import React from 'react';

import { Icons } from '@/ui/Icons/users';
import styles from './repostButton.module.scss';
interface repostButtonProps {
    repostCount: number
    setPostId: (postId: string) => void
    opernRepost: () => void
    postId: string

}
const RepostButton: React.FC<repostButtonProps> = ({ repostCount, postId,setPostId, opernRepost }) => {
    return (
        <button className={styles.repostButton} onClick={() => { opernRepost; setPostId(postId) }}>
            <Icons.repost />
            <span>{repostCount}</span>
        </button>
    );
};

export default RepostButton;
