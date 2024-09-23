import Profile from '@/components/profile/Profile'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
     <>
       <Profile />
       {children}
     </>
  )
}

export default layout
