'use client'

import { motion, AnimatePresence } from "framer-motion";

import {RemoveScrollBar} from 'react-remove-scroll-bar';

interface ModalWindowProps{
    children : React.ReactNode;
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    maxWidth : number;
}

const ModalWindow:React.FC<ModalWindowProps> = ({ children, isOpen, setIsOpen, maxWidth }) => {

  return (
    <AnimatePresence>
        {
            isOpen && (
                <>
                    <RemoveScrollBar />
                    <motion.div 
                        className='fixed z-[30000] left-0 top-0 w-screen h-screen bg-dark-gray/50'
                        initial={{ opacity: 0 }}
                        animate= {{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                        onClick={() => setIsOpen(false)}
                    />

                        <div className="w-full px-[1rem] fixed z-[30001] top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]"
                            style={{ maxWidth: `${maxWidth}rem` }}
                        >
                            <motion.div 
                                className="bg-light-white rounded-[1rem] overflow-hidden"
                                initial={{ y: '-5%', opacity: 0 }}
                                animate={{ y: '0%', opacity: 1 }}
                                exit={{ y: '-5%', opacity: 0 }}
                                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                            >
                                { children }
                            </motion.div>
                        </div>
                </>
            )
        }
    </AnimatePresence>
  )
}

export default ModalWindow