import React from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/thread-logo-w.svg';
import { Icons } from '../../ui/Icons/users';

const NavbarHome: React.FC = () => {
    return (
        <nav>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src={logo} alt="logo" className={styles.logo} />

                </Link>
            </div>
            <ul>
                <li>
                    <Link href="/">
                        <Icons.home />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        {/* <Image src={searchIcon} alt="Search" className={styles.icon} /> */}
                        <Icons.search />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        {/* <Image src={searchIcon} alt="Search" className={styles.icon} /> */}
                        <Icons.create />
                    </Link>
                </li>

                <li>
                    <Link href="/">
                        {/* <Image src={heartIcon} alt="Favorites" className={styles.icon} /> */}
                        <Icons.activity />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        {/* <Image src={profileIcon} alt="Profile" className={styles.icon} /> */}
                        <Icons.profile />
                    </Link>
                </li>
            </ul>
            <div>
                <Link href="/login">
                    <div >Log in</div>
                </Link>      
            </div>
        </nav>
    );
}

export default NavbarHome;
