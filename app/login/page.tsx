import React from 'react';
import styles from '../ui/login/LoginPage.module.scss';
import Image from 'next/image';
import bgPhoto from '../../public/assets/bg.webp';
import Link from 'next/link';


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
                <form action="/" className={styles['login-form']}>
                    <input type="text" placeholder="Username, Email" />
                    <input type="password" placeholder="Password" />
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
