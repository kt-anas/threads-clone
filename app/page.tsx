import React from 'react';
import NavbarHome from './ui/navbar/Navbar';
import styles from './page.module.scss';

export default function Home() {
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
