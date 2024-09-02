'use client'

import Loader from "@/components/SharedComponents/Loader"
import '@/styles/loader.css'
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { RemoveScrollBar } from "react-remove-scroll-bar"
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';



const template = ({ children }: { children: React.ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [showPage, setShowPage] = useState(false)

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
        {
          !isLoading && <TawkMessengerReact
            propertyId="66d5add7ea492f34bc0cbf89"
            widgetId="1i6pau4mq"/>
          }
    </div>
  )
}

export default template