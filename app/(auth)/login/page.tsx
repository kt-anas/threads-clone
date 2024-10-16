
'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../ui/login/LoginPage.module.scss';
import Image from 'next/image';
import bgPhoto from '../../../public/assets/bg.webp';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch,useAppSelector} from '@/lib/hooks';
import { loginUser } from '@/store/reducers/loginSlice';
import InputField from '@/components/Inputs/InputField';
const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, status, error } = useAppSelector((state) => state.login);

    useEffect(() => {
        if (status === 'succeeded' && user) {
            const userId = user._id;
            localStorage.setItem('userId', userId);
            router.push('/main');
        }
    }, [status, user, router]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
        // if(status === 'succeeded' && user) {    
        //     router.push('/main');
        // }
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
                    <InputField
                        type="text"
                        placeholder="Username, Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p className={styles.errorMessage}>{error}</p>}
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