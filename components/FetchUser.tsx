 'use client';
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/lib/hooks';
import { fetchUser } from '@/store/reducers/userSlice';
import { fetchPosts } from '@/store/reducers/postsSlice';


const FetchUser = () => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchPosts());
    }, [dispatch]); 

  return null
}

export default FetchUser
