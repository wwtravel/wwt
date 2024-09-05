import React from 'react'
import { Travel } from '../AdminRoutesContent'
import { useLocale, useTranslations } from 'next-intl';

interface TravelCardProps{
    travel : Travel;
}

const TravelCard:React.FC<TravelCardProps> = ({ travel }) => {

    const locale = useLocale()

    const date_t = useTranslations("RouteSearchPage_Date")
    const route_t = useTranslations("RouteSearchPage")

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

  return (
    <div className='w-full max-lg:hidden bg-light-white border border-gray/25 hover:border-red transition-colors duration-300 shadow-custom rounded-[1rem] px-[4rem] py-[2rem]'>
        <div className='h-[5.5rem] flex justify-between items-center'>
            <div className='h-full flex flex-col justify-between'>
                <div className='flex items-center font-open-sans font-[400] text-[1rem] text-dark-gray line-clamp-1 text-nowrap'>
                    <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                    <p className={`mr-[1rem] text-dark-gray`}>{ `${getDayOfTheWeek(parseDate(travel.departure).dayOfWeek)}, ${parseDate(travel.departure).dayOfMonth} ${getMonthText(parseDate(travel.departure).month)}`}</p>
                    <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                    <p>{ parseDate(travel.departure).timeString }</p>
                </div>
                <div className='flex items-center font-open-sans font-[400] text-[1rem] text-dark-gray line-clamp-1 text-nowrap'>
                    <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                    <p className='mr-[1rem] text-dark-gray'>{ `${getDayOfTheWeek(parseDate(travel.arrival).dayOfWeek)}, ${parseDate(travel.arrival).dayOfMonth} ${getMonthText(parseDate(travel.arrival).month)}`}</p>
                    <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                    <p>{ parseDate(travel.arrival).timeString }</p>
                </div>
            </div>

            <div className='max-w-[38.625rem] w-full flex h-full ml-[1.5rem]'>
                <div className='flex flex-col items-center mr-[0.5rem] py-[0.25rem]'>
                    <img src="/icons/route-card-icons/icon-start-point.svg" alt="start" draggable={false} className='size-[1rem]' />
                    <div className='w-[2px] h-full bg-gray/50'/>
                    <img src="/icons/route-card-icons/icon-finish-point.svg" alt="start" draggable={false} className='size-[1rem]' />
                </div>

                <div className='h-full flex flex-col justify-between mr-[2rem]'>
                    <div className='flex items-center font-open-sans font-[400]'>
                        <p className='text-[1rem] text-gray/75 mr-[0.5rem]'>{ route_t('start') }:</p>
                        <p className='text-[1rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ travel.route.stops[0].label[getLocale(locale)] }</p>
                    </div>
                    <div className='flex items-center font-open-sans font-[400]'>
                        <p className='text-[1rem] text-gray/75 mr-[0.5rem]'>{ route_t('finish') }:</p>
                        <p className='text-[1rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ travel.route.stops[travel.route.stops.length - 1].label[getLocale(locale)] }</p>
                    </div>
                </div>

                <div className='flex flex-col gap-[0.25rem] justify-center mr-[1.5rem]'>
                    <div className='flex items-center gap-[0.5rem] justify-center'>
                        <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" draggable={false} className='size-[1rem]' />
                        <p className='font-open-sans font-bold text-[1rem] text-dark-gray'>{ travel.free_places }</p>
                    </div>
                    <p className='text-[1rem] font-[400] font-open-sans text-gray/75 line-clamp-1 text-nowrap'>{ route_t('free-spaces') }</p>
                </div>
                
            </div>

        </div>

        {/* <RoutesContainerInfo 
            openRoutesIndexes={openRoutes} 
            routeIndex={index} 
            stops={route.route.stops}
            price={route.price}
            freePlaces={route.free_places}
            hoursInterval={route.route.stops[route.route.stops.length -1].hours - route.route.stops[0].hours === 0 ? 4 : route.route.stops[route.route.stops.length -1].hours - route.route.stops[0].hours}
            amenities={route.route.bus.amenities}
        /> */}
    </div>
  )
}

export default TravelCard