 'use client';
import React, { useEffect } from 'react';
import NavbarHome from '../components/navbar/Navbar';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
export default function Home(): React.JSX.Element {
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if(userId) {
            router.push('/main');
        }else{
            router.push('/login');
        }
    },[router]);
    return (
        <main className={styles.main}>
            <div className={styles['navbar-container']}>
                <NavbarHome />
            </div>
            <div className={styles.hello}>
                <h1>Welcome to My Website</h1>
            </div>
        </main>
    );
}
