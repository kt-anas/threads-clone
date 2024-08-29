// components/Navbar.tsx

import Link from 'next/link';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
         <div className={styles.logoContainer}>
            <Link href="/">
                 <img src="https://s3-alpha.figma.com/hub/file/3775071741/a30ea4ff-a952-4f88-aaf5-e732b7984015-cover.png" alt='logo' className={styles.logo}></img>
            </Link>
         </div>
      <ul className={styles.navList}>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
