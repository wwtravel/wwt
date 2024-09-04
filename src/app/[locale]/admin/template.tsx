import { AdminNav } from '@/components'
import React from 'react'

const template = ({ children } : { children : React.ReactNode }) => {
  return (
    <div className='px-[1rem]'>
        <AdminNav />
        {children}
    </div>
  )
}

export default template