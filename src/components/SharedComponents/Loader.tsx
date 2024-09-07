'use client'

import React from 'react'
import { RemoveScrollBar } from 'react-remove-scroll-bar'

import { motion, spring } from 'framer-motion'

const Loader = () => {
  return (
    <motion.div exit={{ opacity: 0 }} className='fixed w-full h-screen top-0 left-0 z-[40000] bg-light-white grid place-content-center'>
        {/* <RemoveScrollBar/> */}
        <div className="loader"></div>
    </motion.div>
  )
}

export default Loader