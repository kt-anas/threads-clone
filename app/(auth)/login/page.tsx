 
import React from 'react';
import styles from '../../../ui/login/LoginPage.module.scss';
import Image from 'next/image';
import bgPhoto from '../../../public/assets/bg.webp';
import Link from 'next/link';
import axiosInstance from '@/axios/axiosInstance';
import Form from '@/components/Form/Form';
   

export const loginUser = async (userData: { username: string; password: string }) => {
       
    try {
        const res = await axiosInstance.post('/users/login', userData);
        return res.data;
    } catch (error) {
        console.log(error);
         
    }  
};

const LoginPage: React.FC = () => {

  
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

              <Form />
               
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
};

export default LoginPage;
