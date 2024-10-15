'use client'
import { Icons } from '@/ui/Icons/users'
import React from 'react'
import styles from './replyButton.module.scss'
interface replyButtonProps {
    replyCount: number
    openComment: () => void
    postId: string
    setPostId: (postId: string) => void
}

const ReplyButton: React.FC<replyButtonProps> = ({ replyCount, openComment, postId, setPostId }) => {
    return (
        <button className={styles.replyButton} onClick={() => { openComment; setPostId(postId) }}>
            <Icons.reply />
            <span >{replyCount}</span>
        </button>
    )
}

export default ReplyButton
