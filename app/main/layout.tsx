import React from 'react'
import Navbar from '../ui/sidebar/Navbar'
import styles from '../ui/main/main.module.scss'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
       <div className={styles['navbar-container']}>
            <Navbar />
        </div>
        <div className={styles.main}>
           
            {children}
        </div>
     </div>
  )
}

export default Layout
