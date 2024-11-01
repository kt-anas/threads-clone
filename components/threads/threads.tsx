'use client';
import React, { ReactNode, useState, useEffect} from 'react';
import styles from '../../ui/main/main.module.scss';
 

import style from './threads.module.scss';

// import { addNewPost } from '@/store/reducers/postsSlice';
 

import { Icons } from '@/ui/Icons/users';
import axiosInstance from '@/axios/axiosInstance';
import PostBtn from '../postButton/postBtn';
import { closeModal } from '@/store/modalSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchPosts } from '@/store/postsSlice';
import Image from 'next/image';
 

interface ThreadsProps {
   
   
    children: ReactNode;
}

 
const Threads: React.FC<ThreadsProps> = ({ children }) => {
    const [postContent, setPostContent] = useState<string>('');
    const [postImage, setPostImage] = useState<any>(null);
    const [preview, setPreview] = useState<string | null>(null);

 const dispatch = useAppDispatch();
 const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);

    const handlePostSubmit = async () => {
        const userId = localStorage.getItem('userId');
        if (postContent.trim() === '') {
            alert('Please write something before posting!');
            return;
        }
        if (! userId) {
            alert('User not found! Please log in.');
            return;
        }

        const newPostFormData = new FormData();
        newPostFormData.append('userId', userId);
        newPostFormData.append('text', postContent);
        newPostFormData.append('image', postImage);

      
 
        // dispatch(addNewPost(newPost));
        try {
            console.log('Sending new post data:', newPostFormData);
            const response = await axiosInstance.post('/posts', newPostFormData);
            console.log('Response:', response);
        } catch (error) {
            console.error('Error adding new post:', error);
        }
        setPostContent('');
        setPostImage(null);
        
        dispatch(closeModal());
        dispatch(fetchPosts());
    };


    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            setPostImage(file);
            const reader = new FileReader();
            console.log("File:", file);
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <button onClick={()=>dispatch(closeModal())} className={style.closeButton}>
                    &times;
                </button>

                <div className={styles.content}>
                    {children}
                    <div className={styles['thread']}>
                        <textarea
                            name="thread"
                            id="thread"
                            placeholder="Write a post"
                            value={postContent}
                            onChange={handlePostChange}
                            className={styles['thread-textarea']}
                        />
                        {preview && (
                            <div className={styles['image-preview-container']}>
                                <Image src={preview} alt="Preview" className={styles['image-preview']} />
                            </div>
                        )}
                        <div className={styles['file-upload-container']}>
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles['file-input']}
                            />
                            <label htmlFor="file-upload" className={styles['file-upload-label']}>
                               <Icons.image />
                            </label>
                        </div>
                    </div>
                    <div className={styles['post-thread']} onClick={handlePostSubmit}>
                        {/* <button
                            className={styles['past-btn']}
                            onClick={handlePostSubmit}
                        >
                            Post
                        </button> */}
                        <PostBtn />
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Threads;
