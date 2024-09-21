'use client'
import { Icons } from '@/ui/Icons/users'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface LikeButtonProps {
    initialLike: number
    postId: string
    userId: string
    likedUsers: string[]  
}

const LikeButton = ({ initialLike, postId, userId, likedUsers }: LikeButtonProps) => {
    const [like, setLike] = useState(initialLike)
    const [isLiked, setIsLiked] = useState(false)
    useEffect(() => {
        if (likedUsers.includes(userId)) {
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

            if (response.status !== 200) {
                throw new Error('Failed to update like on the server.')
            }
        } catch (error) {
            console.error('Error updating like:', error)
    
            setLike(isLiked ? like + 1 : like - 1)
            setIsLiked(isLiked)
        }
    }

    return (
        <button onClick={handleLike}>
            <span>{like}</span>
            <Icons.heart fill={isLiked ? 'currentColor' : 'transparent'} />
        </button>
    )
}

export default LikeButton
