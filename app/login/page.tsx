import React from 'react';
import styles from '../ui/login/LoginPage.module.scss';  
import Image from 'next/image';
import bgPhoto from '../../public/assets/bg.webp';

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
           
            <input type="text" placeholder="Username" /> 
            <input type="text" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
     </div>
    </>
  );
}

export default LoginPage;
