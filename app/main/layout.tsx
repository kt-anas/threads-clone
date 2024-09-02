import React from 'react'
import Navbar from '../ui/sidebar/Navbar'
import styles from '../ui/main/main.module.scss'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
     
        <div>
            <Navbar />
        </div>
        <div>
            {children}
        </div>
         
       
    </div>
  )
}

export default Layout
