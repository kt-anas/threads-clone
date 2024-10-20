import axios from 'axios'
import React from 'react'
import { useAppDispatch } from '@/lib/hooks';
import { fetchNotifications } from '@/store/reducers/notificationSlice';


async function page() {
    const dispatch = useAppDispatch();
    let response = await dispatch( fetchNotifications());
    console.log(response)
  return (
    <div>
      
    </div>
  )
}

export default page
