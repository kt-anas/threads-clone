import React from 'react'
import Navbar from '../../../components/sidebar/Navbar'



const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>

            {children}
        </div>
    )
}

export default Layout