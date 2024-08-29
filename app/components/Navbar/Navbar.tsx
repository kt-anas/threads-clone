// components/Navbar.tsx

import Link from 'next/link';
import styles from './Navbar.module.scss';
 import logo from '../../../public/threads-logo-white.svg'


const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
         <div className={styles.logoContainer}>
            <Link href="/">
                 
                  
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
