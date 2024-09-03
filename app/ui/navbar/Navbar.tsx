import React from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/assets/thread-logo-w.svg';
import { Icons } from '../types/users';

const NavbarHome: React.FC = () => {
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
                        {/* <Image src={searchIcon} alt="Search" className={styles.icon} /> */}
                        <Icons.search />
                    </Link>
                </li>
                <li>
                    <Link href="/main/activity">
                        {/* <Image src={heartIcon} alt="Favorites" className={styles.icon} /> */}
                        <Icons.activity />
                    </Link>
                </li>
                <li>
                    <Link href="/main/profile">
                        {/* <Image src={profileIcon} alt="Profile" className={styles.icon} /> */}
                        <Icons.profile />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarHome;
