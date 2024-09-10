 'use client'

import React, { useState } from 'react';
import styles from '../ui/login/LoginPage.module.scss';
import Image from 'next/image';
import bgPhoto from '../../public/assets/bg.webp';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { fetchUser } from '@/store/reducers/userSlice';
 

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
 
  const dispatch = useAppDispatch();
 
  const router = useRouter();
  const {users, status ,error} = useAppSelector((state) => state.users);
  
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

   
  
  
  

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = users.find(user => user.username === username);
    if (user) {
        // Proceed with login (e.g., authenticate the user)
        localStorage.setItem('userId', user._id);
       
        console.log('User exists, proceed with login');
        console.log(user);
        router.push('/main');
    } else {
        // If the user doesn't exist, redirect to the signup page
        console.log('User does not exist, redirect to the signup page');
        router.push('/signup');
    }
  };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.bgPhoto}>
                    <Image
                        src={bgPhoto}
                        alt="Background Image"
                        width={2000}
                    />
                </div>
            </div>
            <div className={styles['login-container']}>
                <form onSubmit={handleSubmit} className={styles['login-form']}>

                    <input type="text" placeholder="Username, Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input type="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />


                    <button type="submit">Login</button>
                </form>
                <div className={styles.line}>
                    <div className={styles.line1}></div>
                    <p>or</p>
                    <div className={styles.line2}></div>
                </div>
                <div className={styles.signUpContainer}>
                    <Link href="/signup">
                        <button className={styles.signUpButton}>Sign Up</button>
                    </Link>

                </div>
            </div>
        </>
    );
}




export default LoginPage;
