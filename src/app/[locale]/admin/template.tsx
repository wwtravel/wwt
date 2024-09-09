'use client'

import { AdminNav } from '@/components'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from '@/navigation'

const template = ({ children } : { children : React.ReactNode }) => {

  const t = useTranslations("AdminNav")

  const [showAdmin, setShowAdmin] = useState(false)

  const router = useRouter()

  const { data } = useSession()
  const user = data?.user

  useEffect(() => {
    if(user){
      if(user.role === "ADMIN"){
        setShowAdmin(true)
      } else {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }, [user])



  return (
    <>
    {
      showAdmin && (
        <div className='px-[1rem]'>

            <div className='fixed top-0 left-0 w-screen h-screen z-[50002] md:hidden bg-light-white grid place-content-center px-[4rem]'>
              <div className='py-[2rem] px-[1.5rem] rounded-[1rem] w-full flex items-center justify-center bg-red/20 border border-gray/25 shadow-custom'>
                <div className='flex lg:gap-[0.25rem] gap-[0.333rem] text-left'>
                    <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='lg:size-[1rem] size-[1.333rem] mt-[0.25rem]' />
                    <p className='text-left text-dark-gray font-open-sans lg:text-[1rem] text-[1.333rem]'>{ t('admin-screen') }</p>
                </div>
              </div>
            </div>

            <AdminNav />
            {children}
        </div>
      )
    }
    </>
  )
}

export default template