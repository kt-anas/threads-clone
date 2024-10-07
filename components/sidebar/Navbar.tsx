'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import logo from '../../public/assets/thread-logo-w.svg';
import {useRouter} from 'next/navigation';

// import thumbtack from '../../public/assets/thumbtack.svg';
// import logOut from '../../../public/assets/logout.svg';
import { Icons } from '../../ui/Icons/users';
 
 

const Navbar: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();  
    const handleLogout = () => {
        localStorage.clear();   
        router.push('/login');  
    };

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src={logo} alt="logo" className={styles.logo} />

                </Link>
            </div>
            <ul className={styles.navList}>
                <li>
                    <Link href="/main">
                        <Icons.home />
                    </Link>
                </li>
                <li>
                    <Link href="/main/search">
                        <Icons.search />
                    </Link>
                </li>
                <li>
                    <Link href=''>
                        <Icons.create />

                    </Link>

                </li>
                <li>

                    <Link href="/main/activity">

                        <Icons.activity />
                    </Link>
                </li>
                <li>
                    <Link href="/main/profile">

                        <Icons.profile />
                    </Link>
                </li>
            </ul>
            <div className={styles.menuIcons}>

                <Link href="">

                    <Icons.menu onClick={toggleDropdown} />
                </Link>

                {dropdownOpen && (
                    <div className={styles.dropdown}>
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;


