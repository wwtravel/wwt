'use client'

import { useEffect, useState } from "react";
import PassengerDataRow from "./PassengerDataRow";
import { PriceSheet, Travel } from "@/types/routeType";
import { useTranslations } from "next-intl";
import UnderlinedText from "../SearchPageContent/UnderlinedText";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { OrderSchema } from "@/lib/types";

export interface Passenger{
    firstname: string;
    lastname: string;
    price: number;
}

interface ContactDetails{
    phone: string;
    email: string;
}

interface OrderData {
    travel_id: string;
    passengers: Passenger[];
    user_id: string;
    contact_details: ContactDetails;
    lang: string;
}

interface PassengerDataContainerProps{
    prices : PriceSheet;
    depRoute: Travel;
    retRoute: Travel | null;
    setCost: React.Dispatch<React.SetStateAction<number>>
}

const PassengersDataContainer:React.FC<PassengerDataContainerProps> = ({ prices, depRoute, retRoute, setCost }) => {

    const t = useTranslations("RouteSearchPage_Checkout")

    const [validationTrigger, setValidationTrigger] = useState(false)

    const [phoneFocus, setPhoneFocus] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [phoneErr, setPhoneErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)

    const createOrder = async (orderData: OrderData) => {
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'An error occurred while creating the order.');
            }
    
            const result = await response.json();
            console.log('Order created successfully:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClick = async () => {
        let isPassengerDataValidated = true
        setValidationTrigger(true); 
        setTimeout(() => setValidationTrigger(false), 300)
        setEmailErr(false)
        setPhoneErr(false)

        passengers.map(passenger => {
            if(passenger.firstname === '' || passenger.lastname === '' || passenger.price === 0) isPassengerDataValidated = false
        })

        if(!isPassengerDataValidated) return;

        if(contactDetails.phone === ''){
            setPhoneErr(true)
            toast( t('phone-req-title'), {
                description: t('phone-req-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
              return;
        }

        if(contactDetails.email === ''){
            setEmailErr(true)
            toast( t('email-req-title'), {
                description: t('email-req-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
              return;
        }
    }

    const [contactDetails, setContactDetails] = useState<ContactDetails>({
        phone: '',
        email: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactDetails({ ...contactDetails, [name]: value });
    };

    const [passengers, setPassengers] = useState<Passenger[]>([
        {
            firstname: '',
            lastname: '',
            price: 0
        }
    ])

    useEffect(() => {
        setCost(0)
        passengers.map(passenger => {
            setCost(prev => prev + passenger.price)
        })
    }, [passengers])

    const updatePassenger = (index: number, updatedPassenger: Passenger) => {
        setPassengers(prevPassengers => 
            prevPassengers.map((passenger, i) => 
                i === index ? updatedPassenger : passenger
            )
        );
    }

    let maxLength = 10;
    if(depRoute.free_places >= 10) maxLength = 10
        else maxLength = depRoute.free_places

  return (
    <div className='max-w-[47rem] w-full flex flex-col justify-between'>
        <div>
            <div className='w-full flex flex-col md:gap-[1rem] gap-[2rem]'>
                {
                    passengers.map((passenger, index) => (
                        <PassengerDataRow 
                            passenger={passenger} 
                            index={index + 1}
                            setPassenger={(updatedPassenger) => updatePassenger(index, updatedPassenger)}
                            prices={prices}
                            setPassengers={setPassengers}
                            shouldValidate={validationTrigger}
                        />
                    ))
                }
            </div>
            
            {
                passengers.length < maxLength && (
                    <div className="flex items-center justify-center mt-[1.5rem]">
                        <div className="flex items-center gap-[0.25rem]" onClick={() => {
                            setPassengers(prev => [...passengers, { firstname: '', lastname: '', price: 0 }])
                        }}>
                            <img src="/icons/route-card-icons/icon-add.svg" alt="add" draggable={false} className="size-[1.125rem]" />
                            <UnderlinedText text={t('add-passenger')}/>
                        </div>
                    </div>
                )
            }
        </div>

        <div className="w-full mt-[2rem]">
            <p className="font-open-sans md:text-[1.125rem] text-[1.5rem] font-bold text-dark-gray">{ t('contact-details') }</p>
            <div className="w-full mt-[0.5rem] grid lg:grid-cols-3 grid-cols-1 md:gap-[1rem] gap-[0.667rem]">

                {/* phone */}
                    <div className="relative">
                        <input 
                        id="checkoutPhone" 
                            onFocus={() => setPhoneFocus(true)} onBlur={() => setPhoneFocus(false)} 
                            name="phone" value={contactDetails.phone} onChange={handleChange} 
                            className={`${phoneErr && 'animate-input-error'} w-full bg-light-white lg:h-[3.5rem] h-[4.667rem] border border-gray/25  md:rounded-[0.5rem] rounded-[0.667rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="text" maxLength={15}
                        />

                        <motion.label
                            htmlFor="checkoutPhone" 
                            className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                            initial={{ scale: 1, y: '-50%' }}
                            animate={{
                                scale: phoneFocus || contactDetails.phone !== '' ? 0.7 : 1,
                                y: phoneFocus || contactDetails.phone !== '' ? '-80%' : '-50%'
                            }}
                            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                        >
                            { t('phone') }
                        </motion.label>
                    </div>
                {/* phone */}

                {/* email */}
                    <div className="relative">
                        <input 
                        id="checkoutEmail" 
                            onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} 
                            name="email" value={contactDetails.email} onChange={handleChange} 
                            className={`${emailErr && 'animate-input-error'} w-full bg-light-white lg:h-[3.5rem] h-[4.667rem] border border-gray/25  md:rounded-[0.5rem] rounded-[0.667rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="text"
                        />

                        <motion.label
                            htmlFor="checkoutEmail" 
                            className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                            initial={{ scale: 1, y: '-50%' }}
                            animate={{
                                scale: emailFocus || contactDetails.email !== '' ? 0.7 : 1,
                                y: emailFocus || contactDetails.email !== '' ? '-80%' : '-50%'
                            }}
                            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                        >
                            { t('email') }
                        </motion.label>
                    </div>
                {/* email */}

                {/* Finish btn */}
                    <div className="relative lg:h-[3.5rem] h-[4.667rem] w-full bg-red hover:bg-dark-red transition-colors duration-300  md:rounded-[0.5rem] rounded-[0.667rem] cursor-pointer grid place-content-center" onClick={handleClick}>
                        <p className="text-light-white md:text-[1.125rem] text-[1.5rem] font-bold font-open-sans">{ t('finish') }</p>
                        <p className="text-center absolute bottom-0 left-0 right-0 md:translate-y-[1.5rem] translate-y-[2rem] text-red md:text-[0.875rem] text-[1.167rem] font-bold font-open-sans">* { t('payment-info') }</p>
                    </div>
                {/* Finish btn */}

            </div>
        </div>
    </div>
  )
}

export default PassengersDataContainer