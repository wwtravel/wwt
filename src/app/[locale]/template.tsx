'use client'

import Loader from "@/components/SharedComponents/Loader"
import '@/styles/loader.css'
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { RemoveScrollBar } from "react-remove-scroll-bar"



const template = ({ children }: { children: React.ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
        setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <div>
        <AnimatePresence>
            {
                isLoading && <Loader />
            }
        </AnimatePresence>
        { children }
    </div>
  )
}

export default template