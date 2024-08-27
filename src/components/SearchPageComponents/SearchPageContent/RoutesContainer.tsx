'use client'

import React, { useEffect, useState } from 'react'

import { routes } from '@/constants/routesData'
import { useLocale, useTranslations } from 'next-intl'
import RedButton from '@/components/SharedComponents/RedButton'

import { motion } from 'framer-motion'
import UnderlinedText from './UnderlinedText'
import RoutesContainerInfo from './RoutesContainerInfo'

const RoutesContainer = () => {

const locale = useLocale()

const date_t = useTranslations("RouteSearchPage_Date")
const t = useTranslations("RouteSearchPage")

const parseDate = (dateString : string) => {
    const date = new Date(dateString.replace(" ", "T"));

    const dayOfWeek = date.getDay();

    const dayOfMonth = date.getDate();

    const month = date.getMonth() + 1;

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const timeString = `${hours}:${minutes}`;

    return { dayOfWeek, month, timeString, dayOfMonth };
}

const getDayOfTheWeek = ( day : number ) => {
    switch(day){
        case 0 : return date_t('sun')
        case 1 : return date_t('mon')
        case 2 : return date_t('tue')
        case 3 : return date_t('wed')
        case 4 : return date_t('thu')
        case 5 : return date_t('fry')
        case 6 : return date_t('sat')
    }
}

const getMonthText = ( month : number ) => {
    switch(month){
        case 1 : return date_t('jan')
        case 2 : return date_t('feb')
        case 3 : return date_t('mar')
        case 4 : return date_t('apr')
        case 5 : return date_t('may')
        case 6 : return date_t('jun')
        case 7 : return date_t('jul')
        case 8 : return date_t('aug')
        case 9 : return date_t('sept')
        case 10 : return date_t('oct')
        case 11 : return date_t('nov')
        case 12 : return date_t('dec')
    }
}

const getLocale = ( locale: string ) => {
    switch(locale) {
        case 'ro' : return 'ro'
        case 'ru' : return 'ru'
        case 'en' : return 'en'
        case 'fr' : return 'fr'
        default : return 'en'
    }
}

const getHoursBetweenDates = (date1: string, date2: string) => {
    const start = new Date(date1).getTime();
    const end = new Date(date2).getTime(); 

    const diffInMs = Math.abs(end - start);
    
    const hours = diffInMs / (1000 * 60 * 60);
    
    return hours;
  };

const [openRoutes, setOpenRoutes] = useState<number[]>([])

const toggleRoute = (index: number) => {
    setOpenRoutes((prevRoutes) =>
      prevRoutes.includes(index)
        ? prevRoutes.filter((id) => id !== index)
        : [...prevRoutes, index]
    );
};
  
      

  return (
    <div className='mt-[3rem] max-w-[82.75rem] mx-auto w-full flex flex-col gap-[1rem]'>
        {
            routes.map((route, index) => (
                <div className='w-full bg-light-white border border-gray/25 hover:border-red transition-colors duration-300 shadow-custom rounded-[1rem] px-[4rem] py-[2rem]' key={index}>
                    <div className='h-[5.5rem] flex justify-between items-center'>
                        <div className='h-full flex flex-col justify-between'>
                            <div className='flex items-center font-open-sans font-[400] text-[1rem] text-dark-gray line-clamp-1 text-nowrap'>
                                <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p className='mr-[1rem]'>{ `${getDayOfTheWeek(parseDate(route.startDate).dayOfWeek)}, ${parseDate(route.startDate).dayOfMonth} ${getMonthText(parseDate(route.startDate).month)}`}</p>
                                <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p>{ parseDate(route.startDate).timeString }</p>
                            </div>
                            <div className='flex items-center font-open-sans font-[400] text-[1rem] text-dark-gray line-clamp-1 text-nowrap'>
                                <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p className='mr-[1rem]'>{ `${getDayOfTheWeek(parseDate(route.arrivalDate).dayOfWeek)}, ${parseDate(route.arrivalDate).dayOfMonth} ${getMonthText(parseDate(route.arrivalDate).month)}`}</p>
                                <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p>{ parseDate(route.arrivalDate).timeString }</p>
                            </div>
                        </div>

                        <div className='max-w-[54.625rem] w-full flex h-full ml-[1.5rem]'>
                            <div className='flex flex-col items-center mr-[0.5rem]'>
                                <img src="/icons/route-card-icons/icon-start-point.svg" alt="start" draggable={false} className='size-[1rem]' />
                                <div className='w-[2px] h-full bg-gray/50'/>
                                <img src="/icons/route-card-icons/icon-finish-point.svg" alt="start" draggable={false} className='size-[1rem]' />
                            </div>

                            <div className='h-full flex flex-col justify-between mr-[2rem]'>
                                <div className='flex items-center font-open-sans font-[400]'>
                                    <p className='text-[1rem] text-gray/75 mr-[0.5rem]'>{ t('start') }:</p>
                                    <p className='text-[1rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ route.startCity[getLocale(locale)] }</p>
                                    <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                    <p className='text-[0.875rem] text-dark-gray'>{ route.startStreet[getLocale(locale)] }</p>
                                </div>
                                <div className='flex items-center font-open-sans font-[400]'>
                                    <p className='text-[1rem] text-gray/75 mr-[0.5rem]'>{ t('finish') }:</p>
                                    <p className='text-[1rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ route.arrivalCity[getLocale(locale)] }</p>
                                    <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                    <p className='text-[0.875rem] text-red'>{ route.arrivalStreet[getLocale(locale)] }</p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-[0.25rem] justify-center mr-[1.5rem]'>
                                <div className='flex items-center gap-[0.5rem] justify-center'>
                                    <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" draggable={false} className='size-[1rem]' />
                                    <p className='font-open-sans font-bold text-[1rem] text-dark-gray'>{ route.freePlaces }</p>
                                </div>
                                <p className='text-[1rem] font-[400] font-open-sans text-gray/75 line-clamp-1 text-nowrap'>{ t('free-spaces') }</p>
                            </div>

                            <div className='flex justify-between flex-1'>
                                <div className='flex flex-col gap-[0.25rem] justify-center mr-[1.5rem]'>
                                    <p className='font-open-sans font-bold text-[1.5rem] text-dark-gray uppercase text-center'>{ route.price.adult }<span className='text-[1rem]'>eur</span></p>
                                    <p className='text-[0.875rem] font-bold font-open-sans text-red text-center line-clamp-1 text-nowrap'>* { t('payment-info') }</p>
                                </div>

                                <div className='flex flex-col items-center justify-between'>
                                    <RedButton text={t('book')} iconURL='/icons/route-card-icons/icon-checkmark.svg'/>

                                    <div className='flex gap-[0.25rem] items-center cursor-pointer' onClick={() => toggleRoute(index)}>
                                        <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='size-[1rem]' />
                                        <UnderlinedText text={ t('info-route') }/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </div>

                    <RoutesContainerInfo 
                        openRoutesIndexes={openRoutes} 
                        routeIndex={index} 
                        arrivalCityCoord={route.arrivalCityCoord} 
                        startCityCoord={route.startCityCoord}
                        price={route.price}
                        freePlaces={route.freePlaces}
                        hoursInterval={getHoursBetweenDates(route.startDate, route.arrivalDate)}
                        amenities={route.amenities}
                    />
                </div>
            ))
        }
    </div>
  )
}

export default RoutesContainer