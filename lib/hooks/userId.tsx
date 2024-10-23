'use client'
import { useEffect, useState } from "react";

const useUserId = () => {
const [userId, setUserId] =  useState<string | null>(null);

        const storedUserId = localStorage.getItem('userId');
        if(storedUserId){
            setUserId(storedUserId)
        }
    
    

return userId;
}

export default useUserId