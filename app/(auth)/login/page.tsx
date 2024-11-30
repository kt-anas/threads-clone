'use client';
import React, { useState } from 'react';
import styles from '../../../ui/login/LoginPage.module.scss';
import Image from 'next/image';
import bgPhoto from '../../../public/assets/bg.webp';
import Link from 'next/link';
import InputField from '@/components/Inputs/InputField';
import { loginUser } from '@/utils/auth';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userData = { username, password };
            const response = await loginUser(userData);
            console.log("Login successful:", response);
            
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.bgPhoto}>
                <Image
                    src={bgPhoto}
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>
            <div className={styles['login-container']}>
                <form onSubmit={handleSubmit} className={styles['login-form']}>
                    {error && <p className={styles.error}>{error}</p>}
                    <InputField
                        type="text"
                        placeholder="Username or Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={styles['login-button']}>
                        Login
                    </button>
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
        </div>
    );
};

export default LoginPage;
