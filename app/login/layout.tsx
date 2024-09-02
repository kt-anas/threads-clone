import React from 'react'
import Navbar from '../ui/sidebar/Navbar'

/**
 * The layout component for the login page.
 *
 * This component renders the "Login layout" text.
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <Navbar />
      {children}
    </div>
  )
}

export default Layout
