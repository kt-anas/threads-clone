'use client'
import { Icons } from '@/ui/Icons/users'
import React, { useState, useEffect } from 'react'
import styles from './likeButton.module.scss'
import axios from 'axios'

interface LikeButtonProps {
    initialLike: number
    postId: string
    
    likedUsers: string[]  
}

const LikeButton = ({ initialLike, postId,  likedUsers }: LikeButtonProps) => {
    const [like, setLike] = useState(initialLike)
    const [isLiked, setIsLiked] = useState(false)
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        if (likedUsers.includes(userId as string)) {
            setIsLiked(true)
        }
    }, [likedUsers, userId])

    const handleLike = async () => {
        const updatedLike = isLiked ? like - 1 : like + 1
        setLike(updatedLike)
        setIsLiked(!isLiked)

        try {
            
            const endpoint = isLiked 
                ? `https://social-media-rest-apis.onrender.com/api/posts/unlike/${postId}` 
                : `https://social-media-rest-apis.onrender.com/api/posts/like/${postId}`

            const response = await axios.post(endpoint, { userId })
            console.log('Response:', response)

           
        } catch (error) {
            console.error('Error', error)
    
            setLike(isLiked ? like + 1 : like - 1)
            setIsLiked(isLiked)
        }
    }

    return (
        <button onClick={handleLike} className={styles.likeButton}>
            <Icons.heart fill={isLiked ? 'currentColor' : 'transparent'} />
            <span>{like}</span>
        </button>
    )
}

export default LikeButton
