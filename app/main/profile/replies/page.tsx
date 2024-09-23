'use client';
import React from 'react';
import { useAppSelector } from '@/hooks/useAppDispatch';
import styles from '../../../../ui/main/main.module.scss';

const Replies: React.FC = () => {
    const { posts } = useAppSelector((state) => state.post);

    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    post.replies && post.replies.length > 0 ? (
                        <div key={post._id} className={styles['reply-item']}>
                            <h2>{post.username} replied:</h2>
                            {post.replies.map((reply) => (
                                <div key={reply._id} className={styles['reply-content']}>
                                    <p>{reply.text}</p>
                                    {reply.image && <img src={reply.image} alt="Reply" className={styles['reply-image']} />}
                                </div>
                            ))}
                        </div>
                    ) : null
                ))
            ) : (
                <p>No replies available</p>
            )}
        </div>
    );
}

export default Replies;
