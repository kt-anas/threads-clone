 'use client'
import { useEffect, useState } from "react";

 const useUserId = () => {
    const [userId, setUserId] =  useState<string | null>(null);

    useEffect(()=>{
       const getUserId = async () => {
           const userId = localStorage.getItem('userId');
           if(userId){
               setUserId(userId)
           }
       };
       getUserId();
    },[]);
    return userId;
}

export default useUserId