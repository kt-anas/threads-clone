'use client';
import { Icons } from '@/ui/Icons/users';
import React, { useState } from 'react';
import styles from './replyButton.module.scss';
import { openComment } from '@/store/modalSlice';
import { useAppDispatch } from '@/hooks';
import axiosInstance from '@/axios/axiosInstance';

interface ReplyButtonProps {
    postId: string;
    setPostId: (postId: string) => void;
    replyCount: number
}

interface Replies {
    text: string;
    userId: string;
    username: string;
    _id: string;
}

interface postReply {
    postReply: Replies[];
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ postId, setPostId, replyCount }) => {
    const dispatch = useAppDispatch();
    const [replies, setReplies] = useState<postReply[]>([]);

    const fetchPostReplies = async (postId: string) => {
        try {
            const response = await axiosInstance.get(`/posts/reply/${postId}`);
            setReplies(response.data.postReply);
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    const handleClick = () => {
        setPostId(postId);
        dispatch(openComment());
        fetchPostReplies(postId);
    };



    return (
        <button className={styles.replyButton} onClick={handleClick}>
            <Icons.reply />
            <span>{replyCount}</span>
        </button>
    );
};

export default ReplyButton;
