'use client'
import { Icons } from '@/ui/Icons/users'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface LikeButtonProps {
    initialLike: number
    postId: string
    userId: string
    likedUsers: string[] // Array of user IDs who liked the post
}

const LikeButton = ({ initialLike, postId, userId, likedUsers }: LikeButtonProps) => {
    // Initialize the like count and whether the user has liked the post
    const [like, setLike] = useState(initialLike)
    const [isLiked, setIsLiked] = useState(false)

    // Check if the current user has already liked the post
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
            // Dynamically choose the endpoint based on whether the post is liked or unliked
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
            // Revert like state on error
            setLike(isLiked ? like + 1 : like - 1)
            setIsLiked(isLiked)
        }
    }

    return (
        <button onClick={handleLike}>
            <span>{like}</span>
            {/* Change the fill of the heart icon based on whether the post is liked */}
            <Icons.heart fill={isLiked ? 'currentColor' : 'transparent'} />
        </button>
    )
}

export default LikeButton
