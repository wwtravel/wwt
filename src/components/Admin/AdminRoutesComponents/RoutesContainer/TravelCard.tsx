import React, { useState } from 'react'
import { Travel } from '../AdminRoutesContent'
import { useLocale, useTranslations } from 'next-intl';
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText';
import RoutePatchModal from './RouteModal/RoutePatchModal';

interface TravelCardProps{
    travel : Travel;
}

const TravelCard:React.FC<TravelCardProps> = ({ travel }) => {

    const locale = useLocale()

    const date_t = useTranslations("RouteSearchPage_Date")
    const route_t = useTranslations("RouteSearchPage")
    const t = useTranslations("AdminRoutes")

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

    const [reservedSeats, setReservedSeats] = useState(travel.reserved_seats)

    const handleReservedClick = (operation: string) => {
        if(operation === 'decrease' && reservedSeats > 0) setReservedSeats(prev => prev - 1)
        if(operation === 'increase' && reservedSeats < 50) setReservedSeats(prev => prev + 1)
    }

    const [isOpen, setIsOpen] = useState(false)


    //Patch for reserved seats

    const patchTravel = async () => {
        const travelData = {
            id: 'your-travel-id',           // The ID of the travel to be updated
            departure: '2024-03-20T12:00:00Z', // Updated departure time in ISO format
            route_id: 'your-route-id',      // The updated route ID
            reserved_seats: 5               // The updated number of reserved seats
        };
    
        try {
            const response = await fetch('/api/travel', {  // Assuming the API route is /api/travel
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    
                }),
            });
    
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error updating travel:', errorResponse.msg);
            } else {
                const successResponse = await response.json();
                console.log('Travel updated successfully:', successResponse.msg);
            }
        } catch (error) {
            console.error('Failed to update travel:', error);
        }
    };
    

  return (
    <>
        <div className='relative overflow-hidden w-full bg-light-white border border-gray/25 hover:border-red transition-colors duration-300 shadow-custom rounded-[1rem] xl:px-[4rem] px-[2rem] xl:py-[2rem] py-[1rem]'>
            <div className='xl:h-[5.5rem] flex xl:flex-row flex-col max-xl:gap-[2rem] justify-between xl:items-center'>
                <div className='flex lg:flex-row flex-col gap-[2rem] lg:items-center h-full'>
                    <div className='h-full flex flex-col justify-between max-xl:gap-[1rem]'>
                        <div className='flex items-center font-open-sans font-[400] xl:text-[1rem] text-[1.333rem] text-dark-gray line-clamp-1 text-nowrap'>
                            <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='xl:size-[1rem] size-[1.333rem] mr-[0.5rem]' />
                            <p className={`mr-[1rem] text-dark-gray`}>{ `${getDayOfTheWeek(parseDate(travel.departure).dayOfWeek)}, ${parseDate(travel.departure).dayOfMonth} ${getMonthText(parseDate(travel.departure).month)}`}</p>
                            <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='xl:size-[1rem] size-[1.333rem] mr-[0.5rem]' />
                            <p>{ parseDate(travel.departure).timeString }</p>
                        </div>
                        <div className='flex items-center font-open-sans font-[400] xl:text-[1rem] text-[1.333rem] text-dark-gray line-clamp-1 text-nowrap'>
                            <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='xl:size-[1rem] size-[1.333rem] mr-[0.5rem]' />
                            <p className='mr-[1rem] text-dark-gray'>{ `${getDayOfTheWeek(parseDate(travel.arrival).dayOfWeek)}, ${parseDate(travel.arrival).dayOfMonth} ${getMonthText(parseDate(travel.arrival).month)}`}</p>
                            <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='xl:size-[1rem] size-[1.333rem] mr-[0.5rem]' />
                            <p>{ parseDate(travel.arrival).timeString }</p>
                        </div>
                    </div>

                    <div className='flex xl:hidden'>
                        <div className='flex flex-col items-center mr-[0.5rem] py-[0.25rem]'>
                            <img src="/icons/route-card-icons/icon-start-point.svg" alt="start" draggable={false} className='xl:size-[1rem] size-[1.333rem]' />
                            <div className='w-[2px] h-full bg-gray/50'/>
                            <img src="/icons/route-card-icons/icon-finish-point.svg" alt="start" draggable={false} className='xl:size-[1rem] size-[1.333rem]' />
                        </div>

                        <div className='h-full flex flex-col justify-between mr-[2rem] gap-[1rem]'>
                            <div className='flex items-center font-open-sans font-[400]'>
                                <p className='xl:text-[1rem] text-[1.333rem] text-gray/75 mr-[0.5rem]'>{ route_t('start') }:</p>
                                <p className='xl:text-[1rem] text-[1.333rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ travel.route.stops[0].label[getLocale(locale)] }</p>
                            </div>
                            <div className='flex items-center font-open-sans font-[400]'>
                                <p className='xl:text-[1rem] text-[1.333rem] text-gray/75 mr-[0.5rem]'>{ route_t('finish') }:</p>
                                <p className='xl:text-[1rem] text-[1.333rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ travel.route.stops[travel.route.stops.length - 1].label[getLocale(locale)] }</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='max-w-[39rem] w-full flex h-full xl:ml-[1.5rem] justify-between'>
                    <div className='flex'>
                        <div className='flex flex-col items-center mr-[0.5rem] py-[0.25rem] max-xl:hidden'>
                            <img src="/icons/route-card-icons/icon-start-point.svg" alt="start" draggable={false} className='size-[1rem]' />
                            <div className='w-[2px] h-full bg-gray/50'/>
                            <img src="/icons/route-card-icons/icon-finish-point.svg" alt="start" draggable={false} className='size-[1rem]' />
                        </div>

                        <div className='h-full flex flex-col justify-between mr-[2rem] max-xl:hidden'>
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
                                <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" draggable={false} className='xl:size-[1rem] size-[1.333rem]' />
                                <p className='font-open-sans font-bold xl:text-[1rem] text-[1.333rem] text-dark-gray'>{ travel.free_places }</p>
                            </div>
                            <p className='xl:text-[1rem] text-[1.333rem] font-[400] font-open-sans text-gray/75 line-clamp-1 text-nowrap'>{ route_t('free-spaces') }</p>
                        </div>

                        <div className='flex flex-col gap-[0.25rem] justify-center mr-[1.5rem] select-none'>
                            <div className='flex items-center w-full justify-between'>
                                <svg onClick={() => handleReservedClick('decrease')} className='xl:size-[1.125rem] size-[1.5rem] cursor-pointer hover:scale-110 transition-transform duration-300' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1.125C4.6575 1.125 1.125 4.6575 1.125 9C1.125 13.3425 4.6575 16.875 9 16.875C13.3425 16.875 16.875 13.3425 16.875 9C16.875 4.6575 13.3425 1.125 9 1.125ZM9 15.75C5.27794 15.75 2.25 12.7221 2.25 9C2.25 5.27794 5.27794 2.25 9 2.25C12.7221 2.25 15.75 5.27794 15.75 9C15.75 12.7221 12.7221 15.75 9 15.75Z" className={`cursor-pointer transition-colors duration-300 ${reservedSeats <= 0 ? 'fill-gray/75' : 'fill-red'}`}/>
                                    <path d="M11.25 8.4375C7.96954 8.4375 10.0305 8.4375 6.75 8.4375C6.60082 8.4375 6.45774 8.49676 6.35225 8.60225C6.24676 8.70774 6.1875 8.85082 6.1875 9C6.1875 9.14918 6.24676 9.29226 6.35225 9.39775C6.45774 9.50324 6.60082 9.5625 6.75 9.5625C10.0305 9.5625 7.96954 9.5625 11.25 9.5625C11.3992 9.5625 11.5423 9.50324 11.6477 9.39775C11.7532 9.29226 11.8125 9.14918 11.8125 9C11.8125 8.85082 11.7532 8.70774 11.6477 8.60225C11.5423 8.49676 11.3992 8.4375 11.25 8.4375Z" className={`cursor-pointer transition-colors duration-300 ${reservedSeats <= 0 ? 'fill-gray/75' : 'fill-red'}`}/>
                                </svg>

                                <div className='flex items-center gap-[0.5rem] justify-center'>
                                    <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" draggable={false} className='xl:size-[1rem] size-[1.333rem]' />
                                    <p className='font-open-sans font-bold xl:text-[1rem] text-[1.333rem] text-dark-gray'>{ reservedSeats }</p>
                                </div>

                                <svg onClick={() => handleReservedClick('increase')} className='xl:size-[1.125rem] size-[1.5rem] cursor-pointer hover:scale-110 transition-transform duration-300' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1.125C4.6575 1.125 1.125 4.6575 1.125 9C1.125 13.3425 4.6575 16.875 9 16.875C13.3425 16.875 16.875 13.3425 16.875 9C16.875 4.6575 13.3425 1.125 9 1.125ZM9 15.75C5.27794 15.75 2.25 12.7221 2.25 9C2.25 5.27794 5.27794 2.25 9 2.25C12.7221 2.25 15.75 5.27794 15.75 9C15.75 12.7221 12.7221 15.75 9 15.75Z" className={` cursor-pointer transition-colors duration-300 ${reservedSeats >= 50 ? 'fill-gray/75' : 'fill-red'}`}/>
                                    <path d="M11.25 8.4375H9.5625V6.75C9.5625 6.60082 9.50324 6.45774 9.39775 6.35225C9.29226 6.24676 9.14918 6.1875 9 6.1875C8.85082 6.1875 8.70774 6.24676 8.60225 6.35225C8.49676 6.45774 8.4375 6.60082 8.4375 6.75V8.4375H6.75C6.60082 8.4375 6.45774 8.49676 6.35225 8.60225C6.24676 8.70774 6.1875 8.85082 6.1875 9C6.1875 9.14918 6.24676 9.29226 6.35225 9.39775C6.45774 9.50324 6.60082 9.5625 6.75 9.5625H8.4375V11.25C8.4375 11.3992 8.49676 11.5423 8.60225 11.6477C8.70774 11.7532 8.85082 11.8125 9 11.8125C9.14918 11.8125 9.29226 11.7532 9.39775 11.6477C9.50324 11.5423 9.5625 11.3992 9.5625 11.25V9.5625H11.25C11.3992 9.5625 11.5423 9.50324 11.6477 9.39775C11.7532 9.29226 11.8125 9.14918 11.8125 9C11.8125 8.85082 11.7532 8.70774 11.6477 8.60225C11.5423 8.49676 11.3992 8.4375 11.25 8.4375Z" className={`${reservedSeats >= 50 ? 'fill-gray/75' : 'fill-red'} cursor-pointer transition-colors duration-300`}/>
                                </svg>
                            </div>
                            <p className='xl:text-[1rem] text-[1.333rem] font-[400] font-open-sans text-gray/75 line-clamp-1 text-nowrap'>{ t('reserved-places') }</p>
                        </div>
                    </div>
                    
                    <div className='flex justify-center gap-[0.25rem] items-center w-fit max-xl:hidden' onClick={() => setIsOpen(true)}>
                        <img src="/icons/route-card-icons/icon-pencil.svg" alt="edit" className='xl:size-[1rem] size-[1.333rem]' />
                        <UnderlinedText text={ t('patch-route') }/>
                    </div>

                    <div className='group absolute right-0 top-0 w-[6rem] h-full bg-gray/10 hover:bg-gray/15 grid place-content-center transition-colors duration-300 xl:hidden cursor-pointer' onClick={() => setIsOpen(true)}>
                        <img src="/icons/route-card-icons/icon-pencil.svg" alt="edit" className='xl:size-[1rem] size-[1.333rem] opacity-50 group-hover:opacity-100 transition-opacity duration-300' />
                    </div>
                </div>


            </div>

        </div>

        <RoutePatchModal 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalGoal='update'
            travel={travel}
        />
    </>
  )
}

export default TravelCard