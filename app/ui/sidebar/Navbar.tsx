import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import logo from '../../../public/assets/thread-logo-w.svg';
// import homeIcon from '../../../public/assets/home.svg';
// import searchIcon from '../../../public/assets/search-gray.svg';
// import heartIcon from '../../../public/assets/heart-gray.svg';
// import profileIcon from '../../../public/assets/user.svg';
import thumbtack from '../../../public/assets/thumbtack.svg';
// import logOut from '../../../public/assets/logout.svg';
import { Icons } from '../types/users';
// import { transform } from 'next/dist/build/swc';

const Navbar: React.FC = () => {
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
            <div className={styles.utilityIcons}>
                <Link href="/">
                    <Image src={thumbtack} alt="Pin" className={styles.icon} />
                </Link>
                <Link href="/">
                    {/* <Image src={logOut} alt="Logout" className={styles.icon} /> */}


                    <Icons.menu />

                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
