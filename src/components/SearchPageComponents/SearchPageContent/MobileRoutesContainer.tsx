'use client'

import { TravelResponse } from "@/types/routeType"
import { useLocale, useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import UnderlinedText from "./UnderlinedText"
import RedButton from "@/components/SharedComponents/RedButton"
import { useState } from "react"
import RoutesContainerInfo from "./RoutesContainerInfo"

interface MobileRoutesContainerProps{
    routes: TravelResponse
}

const MobileRoutesContainer: React.FC<MobileRoutesContainerProps> = ({ routes }) => {

    const locale = useLocale()
    const searchParams = useSearchParams()

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
    
    const extractDate = ( textDate: string ) => {
        const date = new Date(textDate);
        const dateString = date.toISOString().split('T')[0];
    
        return dateString
    }

    const [openRoutes, setOpenRoutes] = useState<number[]>([])

    const toggleRoute = (index: number) => {
        setOpenRoutes((prevRoutes) =>
        prevRoutes.includes(index)
            ? prevRoutes.filter((id) => id !== index)
            : [...prevRoutes, index]
        );
    };

  return (
    <div className="lg:hidden">
        {
            routes.map(( route, index ) => (
                <div className="px-[1.333rem] max-md:max-w-[29.5rem] max-md:mx-auto py-[2rem] bg-light-white border border-gray/25 rounded-[1.333rem] hover:border-red transition-colors duration-300" key={index}>
                    <div className="flex md:flex-row flex-col justify-between max-md:gap-[0.333rem]">
                        <div className="flex gap-[0.667rem]">
                            <div className='flex flex-col items-center h-full pt-[2.55rem]'>
                                <img src="/icons/route-card-icons/icon-start-point.svg" alt="start" draggable={false} className='size-[1.5rem]' />
                                <div className='w-[2px] h-[6.75rem] bg-gray/50'/>
                                <img src="/icons/route-card-icons/icon-finish-point.svg" alt="start" draggable={false} className='size-[1.5rem]' />
                            </div>

                            <div>
                                <div className='flex items-center font-open-sans font-[400] text-[1.333rem] text-dark-gray line-clamp-1 text-nowrap mb-[0.333rem]'>
                                    <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1.333rem] mr-[0.667rem]' />
                                    <p className={`mr-[1.333rem] ${ extractDate(routes[0].departure) === searchParams.get('depdate') && "text-red font-bold" }`}>{ `${getDayOfTheWeek(parseDate(route.departure).dayOfWeek)}, ${parseDate(route.departure).dayOfMonth} ${getMonthText(parseDate(route.departure).month)}`}</p>
                                    <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1.333rem] mr-[0.5rem]' />
                                    <p>{ parseDate(route.departure).timeString }</p>
                                </div>
                                <div className='flex items-center font-open-sans font-[400]'>
                                    <p className='text-[1.333rem] text-gray/75 mr-[0.667rem]'>{ t('start') }:</p>
                                    <p className='text-[1.333rem] text-dark-gray mr-[0.667rem] line-clamp-1 text-nowrap'>{ route.route.stops[0].label[getLocale(locale)] }</p>
                                    <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1.333rem] mr-[0.667rem]' />
                                    <p className='text-[1.167rem] text-dark-gray'>{ route.route.stops[0].city === 'chisinau' ? t('street') : t('pass-req') }</p>
                                </div>
                                <div className='flex mt-[4rem] items-center font-open-sans font-[400] text-[1.333rem] text-dark-gray line-clamp-1 text-nowrap'>
                                    <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1.333rem] mr-[0.667rem]' />
                                    <p className='mr-[1.333rem]'>{ `${getDayOfTheWeek(parseDate(route.arrival).dayOfWeek)}, ${parseDate(route.arrival).dayOfMonth} ${getMonthText(parseDate(route.arrival).month)}`}</p>
                                    <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1.333rem] mr-[0.667rem]' />
                                    <p>{ parseDate(route.arrival).timeString }</p>
                                </div>
                                <div className='flex items-center font-open-sans font-[400] mt-[0.333rem]'>
                                    <p className='text-[1.333rem] text-gray/75 mr-[0.667rem]'>{ t('finish') }:</p>
                                    <p className='text-[1.333rem] text-dark-gray mr-[0.667rem] line-clamp-1 text-nowrap'>{ route.route.stops[route.route.stops.length - 1].label[getLocale(locale)] }</p>
                                    <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1.333rem] mr-[0.667rem]' />
                                    <p className='text-[1.167rem] text-red h-[1.333rem] leading-[1]'>{ route.route.stops[route.route.stops.length - 1].city === 'chisinau' ? t('street') : t('pass-req') }</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-[2rem] md:flex-row flex-col mt-[1rem]">
                            <div className='flex flex-col gap-[0.333rem] justify-center'>
                                <p className='font-open-sans font-bold text-[2rem] text-dark-gray uppercase text-center'>{ route.price.adult }<span className='text-[1.333rem]'>eur</span></p>
                                <p className='text-[1.167rem] font-bold font-open-sans text-red text-center line-clamp-1 text-nowrap'>* { t('payment-info') }</p>
                            </div>

                            <div className='flex md:flex-col flex-row items-center justify-center md:gap-[0.667rem] gap-[1.333rem]'>
                                <button className='h-[4.667rem] bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.667rem] px-[2rem] flex items-center justify-center text-[1.5rem] font-bold text-white'>
                                        <img className='size-[2rem] mr-[0.667rem]' src="/icons/route-card-icons/icon-checkmark.svg" alt="icon" draggable={false} />
                                    <p>
                                        { t('book') }
                                    </p>
                                </button>

                                <div className='flex gap-[0.333rem] items-center cursor-pointer' onClick={() => toggleRoute(index)}>
                                    <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='size-[1.333rem]' />
                                    <UnderlinedText text={ t('info-route') }/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <RoutesContainerInfo 
                        openRoutesIndexes={openRoutes} 
                        routeIndex={index} 
                        stops={route.route.stops}
                        price={route.price}
                        freePlaces={route.free_places}
                        hoursInterval={route.route.stops[route.route.stops.length -1].hours}
                        amenities={route.route.bus.amenities}
                    />

                </div>
            ))
        }
    </div>
  )
}

export default MobileRoutesContainer