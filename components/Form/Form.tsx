
'use client'
import React, { useState } from 'react'
import InputField from '../Inputs/InputField';
import { useRouter } from 'next/navigation';
import styles from '../../ui/login/LoginPage.module.scss';
import { loginUser } from '@/app/(auth)/login/page';
import { setCookie } from '@/lib/utils/setCookie';
const Form = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = await loginUser({ username, password });

        if (user && user._id) {
            const userId = user._id;
            await setCookie(userId);
            router.push('/main');
        }
    };

    return (
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
            <button type="submit" >
                Login
            </button>
        </form>
    )
}

export default Form
