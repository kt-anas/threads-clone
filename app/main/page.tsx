'use client'
import React from 'react'
 
import { usePathname } from 'next/navigation'

const HomePage = () => {
    const pathname = usePathname()
  return (
    <div>
       <h1>{pathname}</h1>
     
    </div>
  )
}

export default HomePage
