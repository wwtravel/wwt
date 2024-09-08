'use client'

import { useEffect, useState } from "react";
import PassengerDataRow from "./PassengerDataRow";
import { PriceSheet, Travel } from "@/types/routeType";
import { useLocale, useTranslations } from "next-intl";
import UnderlinedText from "../SearchPageContent/UnderlinedText";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { OrderSchema } from "@/lib/types";
import PulseLoader from "react-spinners/PulseLoader";
import { useStore } from "zustand";
import { useCurrencyStore } from "@/hooks/useCurrencyStore";

export interface Passenger{
    firstname: string;
    lastname: string;
    price: {
        currency : string;
        value : number;
    }
}

interface ContactDetails{
    phone: string;
    email: string;
}

interface BaseOrderData {
    contact_details: {
        phone_number: string;
        email: string;
    };
    lang: string;
    user_id?: string;
}

interface OrderDetails{
    travel_id: string;
    passengers: Passenger[];
    departure_date : string;
    arrival_date : string;
    departure_place : {
        country: string;
        city: string;
        label : {
            en : string;
            ro : string;
            ru : string;
            fr : string;
        }
    },
    arrival_place : {
        country : string;
        city: string;
        label : {
            en : string;
            ro : string;
            ru : string;
            fr : string;
        }
    }
}


interface User{
    id?: string;
    dob?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    phone_number?: string;
}

interface PassengerDataContainerProps{
    prices : PriceSheet;
    route : Travel | null;
    setCost: React.Dispatch<React.SetStateAction<number>>
    passengers: Passenger[];
    updatePassenger: (index: number, updatedPassenger: Passenger) => void;
    setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
    setCheckoutContent: React.Dispatch<React.SetStateAction<"tour" | "return">>;
    checkoutContent : "tour" | "return";
    passengersFullObj : {
        tourPassengers : Passenger[];
        returnPassengers : Passenger[];
    }
    user : User | undefined;
    seletcedDepartureRoute : Travel;
    seletcedArrivalRoute : Travel | null;
    setCheckoutSuccess: React.Dispatch<React.SetStateAction<boolean>>
    shouldReturn : boolean;
}

const PassengersDataContainer:React.FC<PassengerDataContainerProps> = ({ prices, route, setCost, passengers, setPassengers, updatePassenger, setCheckoutContent, checkoutContent, passengersFullObj, user, seletcedArrivalRoute, seletcedDepartureRoute, setCheckoutSuccess, shouldReturn }) => {

    const t = useTranslations("RouteSearchPage_Checkout")
    const locale = useLocale()

    const currency = useStore(useCurrencyStore, (state) => state.currency)


    const [validationTrigger, setValidationTrigger] = useState(false)

    const [phoneFocus, setPhoneFocus] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [phoneErr, setPhoneErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)

    
    const handleClickContinue = async () => {
        let isPassengerDataValidated = true
        setValidationTrigger(true); 
        setTimeout(() => setValidationTrigger(false), 300)
        
        passengers.map(passenger => {
            if(passenger.firstname === '' || passenger.lastname === '' || passenger.price.value === 0) isPassengerDataValidated = false
        })
        
        if(!isPassengerDataValidated) return;
        
        setValidationTrigger(false)
        setCheckoutContent('return')
    }

    useEffect(() => {
        if(user){
            setContactDetails({
                phone: user.phone_number ?? '',
                email: user.email ?? ''
            })
        }
    }, [user])

    const [contactDetails, setContactDetails] = useState<ContactDetails>({
        phone: user?.phone_number ? user.phone_number : '',
        email: user?.email ? user.email : '',
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactDetails({ ...contactDetails, [name]: value });
    };
    
    useEffect(() => {
        setCost(0)
        passengers.map(passenger => {
            setCost(prev => prev + passenger.price.value)
        })
    }, [passengers])
    
    // < checkout api call

    const [loading, setLoading] = useState(false)

    const baseOrderData: BaseOrderData = {
        contact_details: {
            phone_number: contactDetails.phone,
            email: contactDetails.email,
        },
        lang: locale
    };

    if(user) baseOrderData.user_id = user.id;

    const orderTourDetails: OrderDetails = {
        travel_id: seletcedDepartureRoute.id,
        passengers: passengersFullObj.tourPassengers,
        departure_date: seletcedDepartureRoute.departure,
        arrival_date: seletcedDepartureRoute.arrival,
        departure_place: {
            country: seletcedDepartureRoute.route.stops[0].country, // Ensure country is set
            city: seletcedDepartureRoute.route.stops[0].city,
            label: {
                ro: seletcedDepartureRoute.route.stops[0].label.ro,
                en: seletcedDepartureRoute.route.stops[0].label.en,
                ru: seletcedDepartureRoute.route.stops[0].label.ru,
                fr: seletcedDepartureRoute.route.stops[0].label.fr
            }
        },
        arrival_place: {
            country: seletcedDepartureRoute.route.stops[seletcedDepartureRoute.route.stops.length - 1].country, // Ensure country is set
            city: seletcedDepartureRoute.route.stops[seletcedDepartureRoute.route.stops.length - 1].city,
            label: {
                ro: seletcedDepartureRoute.route.stops[seletcedDepartureRoute.route.stops.length - 1].label.ro,
                en: seletcedDepartureRoute.route.stops[seletcedDepartureRoute.route.stops.length - 1].label.en,
                ru: seletcedDepartureRoute.route.stops[seletcedDepartureRoute.route.stops.length - 1].label.ru,
                fr: seletcedDepartureRoute.route.stops[seletcedDepartureRoute.route.stops.length - 1].label.fr
            }
        }
    };
    
    const orderReturnDetails: OrderDetails | null = seletcedArrivalRoute 
    ? {
        travel_id: seletcedArrivalRoute.id,
        passengers: passengersFullObj.returnPassengers,
        departure_date: seletcedArrivalRoute.departure,
        arrival_date: seletcedArrivalRoute.arrival,
        departure_place: {
            country: seletcedArrivalRoute.route.stops[0].country, // Ensure country is set
            city: seletcedArrivalRoute.route.stops[0].city,
            label: {
                ro: seletcedArrivalRoute.route.stops[0].label.ro,
                en: seletcedArrivalRoute.route.stops[0].label.en,
                ru: seletcedArrivalRoute.route.stops[0].label.ru,
                fr: seletcedArrivalRoute.route.stops[0].label.fr
            }
        },
        arrival_place: {
            country: seletcedArrivalRoute.route.stops[seletcedArrivalRoute.route.stops.length - 1].country, // Ensure country is set
            city: seletcedArrivalRoute.route.stops[seletcedArrivalRoute.route.stops.length - 1].city,
            label: {
                ro: seletcedArrivalRoute.route.stops[seletcedArrivalRoute.route.stops.length - 1].label.ro,
                en: seletcedArrivalRoute.route.stops[seletcedArrivalRoute.route.stops.length - 1].label.en,
                ru: seletcedArrivalRoute.route.stops[seletcedArrivalRoute.route.stops.length - 1].label.ru,
                fr: seletcedArrivalRoute.route.stops[seletcedArrivalRoute.route.stops.length - 1].label.fr
            }
        }
    }
    : null

    async function createOrders(baseOrderData: BaseOrderData, orderTourDetails : OrderDetails, orderReturnDetails : OrderDetails | null) {
        setEmailErr(false)
        setPhoneErr(false)

        setLoading(true)

        try {
            const createOrderData = (orderDetails : OrderDetails) => {
                const orderData = {
                    ...baseOrderData,
                    travel_id: orderDetails.travel_id,
                    passengers: orderDetails.passengers,
                    departure_date: orderDetails.departure_date,
                    arrival_date: orderDetails.arrival_date,
                    departure_place: {
                        country: orderDetails.departure_place.country,
                        city: orderDetails.departure_place.city,
                        label: {
                            ro: orderDetails.departure_place.label.ro,
                            en: orderDetails.departure_place.label.en,
                            ru: orderDetails.departure_place.label.ru,
                            fr: orderDetails.departure_place.label.fr
                        }
                    },
                    arrival_place: {
                        country: orderDetails.arrival_place.country,
                        city: orderDetails.arrival_place.city,
                        label: {
                            ro: orderDetails.arrival_place.label.ro,
                            en: orderDetails.arrival_place.label.en,
                            ru: orderDetails.arrival_place.label.ru,
                            fr: orderDetails.arrival_place.label.fr
                        }
                    },
                    ...(baseOrderData.user_id && { user_id: baseOrderData.user_id })
                };

                const result = OrderSchema.safeParse(orderData);
                if (!result.success) {
                    result.error.issues.forEach((issue) => {
                        const field = issue.path[1]
                        if(field === 'email'){
                            setEmailErr(true)
                            toast( t('email-err-title'), {
                                description: t('email-err-desc'),
                                action: {
                                label: t('close'),
                                onClick: () => {}
                                }
                            })
                            setLoading(false)
                            throw new Error('Email validation failed');
                        }
                        if(field === 'phone_number'){
                            setPhoneErr(true)
                            toast( t('phone-err-title'), {
                                description: t('phone-err-desc'),
                                action: {
                                label: t('close'),
                                onClick: () => {}
                                }
                            })
                            setLoading(false)
                            throw new Error('Phone number validation failed');
                        }
                    });
                }
    
                return orderData;
            };
    
            const orderDataTour = createOrderData(orderTourDetails);
            const orderDataReturn = orderReturnDetails ? createOrderData(orderTourDetails) : null;

            console.log("dsdsdsg", orderDataReturn)
    
            const responseTour = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDataTour),
            });
    
            const dataTour = await responseTour.json();
            if (!responseTour.ok) {
                setLoading(false)
                throw new Error(dataTour.msg || 'Failed to create the first order');
            }
    
            if(orderDataReturn){
                const responseReturn = await fetch('/api/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDataReturn),
                });
        
                const dataReturn = await responseReturn.json();
                if (!responseReturn.ok) {
                    setLoading(false)
                    throw new Error(dataReturn.msg || 'Failed to create the second order');
                }
            }

            setCheckoutSuccess(true)
        } catch (error: any) {
            setLoading(false)
            console.error('Error creating orders:', error.message);
        }
    }

    const handleClickFinish = async () => {
        let isPassengerDataValidated = true
        setValidationTrigger(true); 
        setTimeout(() => setValidationTrigger(false), 300)
        setEmailErr(false)
        setPhoneErr(false)

        passengers.map(passenger => {
            if(passenger.firstname === '' || passenger.lastname === '' || passenger.price.value === 0) isPassengerDataValidated = false
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

        createOrders(baseOrderData, orderTourDetails, orderReturnDetails)
    }

    // checkout api call >


    let maxLength = 10;
    if(route){
        if(route.free_places >= 10) maxLength = 10
            else maxLength = route.free_places
    }

  return (
    <div className='lg:max-w-[47rem] w-full flex flex-col justify-between flex-1'>
        <div>
            <div className='w-full flex flex-col md:gap-[1rem] gap-[2rem]'>
                {
                    passengers.map((passenger, index) => (
                        <PassengerDataRow key={index}
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
                            setPassengers(prev => [...passengers, { firstname: '', lastname: '', price: { currency: currency, value: 0 } }])
                        }}>
                            <img src="/icons/route-card-icons/icon-add.svg" alt="add" draggable={false} className="size-[1.125rem]" />
                            <UnderlinedText text={t('add-passenger')}/>
                        </div>
                    </div>
                )
            }
        </div>

        <div className="w-full mt-[2rem]">
            {
                (checkoutContent === 'return' || checkoutContent === 'tour' && !shouldReturn) && <p className="font-open-sans md:text-[1.125rem] text-[1.5rem] font-bold text-dark-gray">{ t('contact-details') }</p>
            }
            <div className={`w-full mt-[0.5rem] grid lg:grid-cols-3 grid-cols-1 md:gap-[1rem] gap-[0.667rem]`}>

                {/* phone */}
                    <div className="relative">
                        {
                            (checkoutContent === 'return' || checkoutContent === 'tour' && !shouldReturn) && (
                                <>
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
                                </>
                            ) 
                        }
                    </div>
                {/* phone */}

                {/* email */}
                    <div className="relative">
                        {
                            (checkoutContent === 'return' || checkoutContent === 'tour' && !shouldReturn) && (
                                <>
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
                                </>
                            )
                        }
                    </div>
                {/* email */}

                {/* Finish btn */}
                {
                    <div className="relative lg:h-[3.5rem] h-[4.667rem] w-full bg-red hover:bg-dark-red transition-colors duration-300  md:rounded-[0.5rem] rounded-[0.667rem] cursor-pointer grid place-content-center" onClick={(checkoutContent === 'return' || checkoutContent === 'tour' && !shouldReturn) ? handleClickFinish : handleClickContinue}>
                        {
                            loading 
                            ? <div><PulseLoader 
                                size={5}
                                color="#FCFEFF"
                              /></div>
                            : <p className="text-light-white md:text-[1.125rem] text-[1.5rem] font-bold font-open-sans">{ (checkoutContent === 'return' || checkoutContent === 'tour' && !shouldReturn) ? t('finish') : t('continue') }</p>
                        }
                        {
                            (checkoutContent === 'return' || checkoutContent === 'tour' && !shouldReturn) && <p className="text-center absolute bottom-0 left-0 right-0 md:translate-y-[1.5rem] translate-y-[2rem] text-red md:text-[0.875rem] text-[1.167rem] font-bold font-open-sans">* { t('payment-info') }</p>
                        }
                    </div>
                }
                {/* Finish btn */}

            </div>
        </div>
    </div>
  )
}

export default PassengersDataContainer