'use client'

import { useTranslations } from "next-intl";
import { Passenger } from "./PassengersDataContainer"
import { ChangeEvent, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import PriceSelectBox from "./PriceSelectBox";
import { PriceSheet } from "@/types/routeType";
import UnderlinedText from "../SearchPageContent/UnderlinedText";
import { toast } from "sonner";

interface PassengerDataRowProps{
    index: number;
    passenger : Passenger;
    setPassenger: (updatedPassenger: Passenger) => void;
    prices : PriceSheet;
    setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>
    shouldValidate: boolean;
}

const PassengerDataRow:React.FC<PassengerDataRowProps> = ({ passenger, index, setPassenger, prices, setPassengers, shouldValidate }) => {

  const [lastNameFocus, setLastNameFocus] = useState(false)
  const [firstNameFocus, setFirstNameFocus] = useState(false)

  const [lastNameErr, setLastNameErr] = useState(false)
  const [firstNameErr, setFirstNameErr] = useState(false)
  const [priceErr, setPriceErr] = useState(false)


  const t = useTranslations("RouteSearchPage_Checkout")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassenger({ ...passenger, [name]: value });
  };

  const removePassenger = (indexToRemove: number) => {
    setPassengers((prevPassengers) =>
      prevPassengers.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    if(shouldValidate) {
        
        setFirstNameErr(false)
        setLastNameErr(false)
        setPriceErr(false)

        if(passenger.lastname === ''){
            setLastNameErr(true)
            toast( t('lastname-req-title'), {
                description: t('lastname-req-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
              return;
        }
        if(passenger.lastname.length > 50){
            setLastNameErr(true)
            toast( t('lastname-err-title'), {
                description: t('lastname-err-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
              return;
        }
        if(passenger.firstname === ''){
            setFirstNameErr(true)
            toast( t('firstname-req-title'), {
                description: t('firstname-req-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
              return;
        }
        if(passenger.firstname.length > 50){
            setFirstNameErr(true)
            toast( t('firstname-err-title'), {
                description: t('firstname-err-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
              return;
        }
        if(passenger.price === 0){
            setPriceErr(true)
            toast( t('price-req-title'), {
                description: t('price-req-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
              return;
        }
    }
  }, [shouldValidate])

  return (
        <motion.div
            initial={{ opacity: index === 1 ? 1 : 0, height: index === 1 ? 'auto' : 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            key={index} className="w-full">
            <div className="flex items-end justify-between w-full">
                <p className="md:text-[1.125rem] text-[1.5rem] text-dark-gray font-open-sans font-bold">{t('passenger')} { t('number') } { index } { index === 1 && `(${ t('main') })` } </p>
                {
                    index !== 1 && (
                        <div className="flex items-center gap-[0.25rem]" onClick={() => removePassenger(index - 1)}>
                            <img src="/icons/route-card-icons/icon-delete.svg" alt="delete" draggable={false} className="size-[1.125rem]" />
                            <UnderlinedText text={ t('delete') }/>
                        </div>
                    ) 
                }
            </div>
            <div className="mt-[0.5rem] grid lg:grid-cols-3 grid-cols-1 md:gap-[1rem] gap-[0.667rem]">
                <div className="relative">
                    <input 
                    id={`checkoutLastName${index}`} 
                        onFocus={() => setLastNameFocus(true)} onBlur={() => setLastNameFocus(false)} 
                        name="lastname" value={passenger.lastname} onChange={handleChange} 
                        className={`${lastNameErr && 'animate-input-error'} w-full bg-light-white lg:h-[3.5rem] h-[4.667rem] border border-gray/25 md:rounded-[0.5rem] rounded-[0.667rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="text" maxLength={50}
                    />

                    <motion.label
                        htmlFor={`checkoutLastName${index}`}
                        className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                        initial={{ scale: 1, y: '-50%' }}
                        animate={{
                            scale: lastNameFocus || passenger.lastname !== '' ? 0.7 : 1,
                            y: lastNameFocus || passenger.lastname !== '' ? '-80%' : '-50%'
                        }}
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                    >
                        { t('lastname') }
                    </motion.label>
                </div>

                <div className="relative">
                    <input 
                    id={`checkoutFirstName${index}`} 
                        onFocus={() => setFirstNameFocus(true)} onBlur={() => setFirstNameFocus(false)} 
                        name="firstname" value={passenger.firstname} onChange={handleChange} 
                        className={`${firstNameErr && 'animate-input-error'} w-full bg-light-white lg:h-[3.5rem] h-[4.667rem] border border-gray/25  md:rounded-[0.5rem] rounded-[0.667rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="text" maxLength={50}
                    />

                    <motion.label
                        htmlFor={`checkoutFirstName${index}`}
                        className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                        initial={{ scale: 1, y: '-50%' }}
                        animate={{
                            scale: firstNameFocus || passenger.firstname !== '' ? 0.7 : 1,
                            y: firstNameFocus || passenger.firstname !== '' ? '-80%' : '-50%'
                        }}
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                    >
                        { t('firstname') }
                    </motion.label>
                </div>

                <PriceSelectBox 
                    prices={prices} 
                    passenger={passenger}
                    setPassenger={setPassenger}
                    selectBoxErr={priceErr}
                />
            </div>
        </motion.div>
  )
}

export default PassengerDataRow