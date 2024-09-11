'use client'

import Loader from "@/components/SharedComponents/Loader"
import '@/styles/loader.css'
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { usePathname } from "@/navigation"


const template = ({ children }: { children: React.ReactNode }) => {

  const pathname = usePathname()

  const [isLoading, setIsLoading] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const ref = useRef<any>()

  function tawkWidgetToggle(show: boolean){
    if(window.$_Tawk && window.$_Tawk.init){
     show ? showWidget() : hideWidget();
   }else{
     if( window.Tawk_API ){
       window.Tawk_API.onLoad = function(){
         show ? showWidget() : hideWidget();
       };
     }
 
   }
 
 }
 
 function showWidget() {
    if (window.Tawk_API && typeof window.Tawk_API.showWidget === 'function') {
      window.Tawk_API.showWidget();
    }
  }

function hideWidget() {
    if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
      window.Tawk_API.hideWidget();
    }
  }

  useEffect(() => {
    setShowChat(false)
    setIsLoading(true)
    
    setTimeout(() => {
        setIsLoading(false)
    }, 1500)

    setTimeout(() => {
      setShowChat(true)
    }, 2300)
  }, [])

  useEffect(() => {
      tawkWidgetToggle(showChat)
  }, [showChat])

  return (
    <div>
        <AnimatePresence>
            {
                isLoading && pathname.split('/')[1] !== 'admin' && <Loader />
            }
        </AnimatePresence>
        { children }
        {
          pathname.split('/')[1] !== 'admin' && (
            <TawkMessengerReact
              propertyId="66d5add7ea492f34bc0cbf89" 
              widgetId="1i6pau4mq"
              ref={ref}
            />
          )
        }
    </div>
  )
}

export default template