import { SelectedRoutes } from '@/app/[locale]/route-search/PageContent';
import { Link } from '@/navigation';
import { Travel, TravelResponse } from '@/types/routeType';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader';
import RoutesContainerInfo from '../SearchPageContent/RoutesContainerInfo';
import UnderlinedText from '../SearchPageContent/UnderlinedText';
import RedButton from '@/components/SharedComponents/RedButton';
import MobileReturnRoutesContainer from './MobileReturnRoutesContainer';

interface ReturnRoutesContainerProps{
    setSelectedRoutes: React.Dispatch<React.SetStateAction<SelectedRoutes>>;
    seletcedRoute : Travel;
}

const ReturnRoutesContainer:React.FC<ReturnRoutesContainerProps> = ({ setSelectedRoutes, seletcedRoute }) => {

    const searchParams = useSearchParams()

    const [routes, setRoutes] = useState<TravelResponse>([])
    const [loading, setLoading] = useState(true)

    const searchRoutes = async (departureCity: string, arrivalCity: string, departureDate: string) => {
        try {
            setLoading(true)
            setRoutes([])
            const body: any = {
                departure_city: departureCity,
                arrival_city: arrivalCity,
                departure_date: departureDate 
            };
    
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
    
            if (!response.ok) {
                setLoading(false)
                const errorData = await response.json();
                throw new Error(errorData.msg || 'An error occurred while searching for routes.');
            }
    
            const result = await response.json();
            setRoutes(result)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error:', error);
            throw error;
        }
    };
    
    useEffect(() => {
        searchRoutes(seletcedRoute.route.stops[0].city, seletcedRoute.route.stops[seletcedRoute.route.stops.length - 1].city, extractDate(seletcedRoute.departure))
    }, [searchParams])
    
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


    if(loading) return (
        <div className='mt-[3rem] md:max-w-[82.75rem] max-w-[29.5rem] h-[9.5rem] rounded-[1rem]  mx-auto w-full grid place-content-center bg-light-white border border-gray/25 shadow-custom'>
            <PulseLoader 
                size={15}
                color='#757678'
                style={{
                    opacity: '25%'
                }}
            />
        </div>
      )
    
      if(routes.length === 0) return (
        <div className='mt-[3rem] md:max-w-[82.75rem] max-w-[29.5rem] py-[2rem] px-[1.5rem] rounded-[1rem]  mx-auto w-full flex items-center justify-center bg-red/20 border border-gray/25 shadow-custom'>
            <div className='flex lg:gap-[0.25rem] gap-[0.333rem] text-left'>
                <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='lg:size-[1rem] size-[1.333rem] mt-[0.25rem]' />
                <p className='text-left text-dark-gray font-open-sans lg:text-[1rem] text-[1.333rem]'>{ t('no-route-found_part1') } <Link className='underline' href="/contacts">{ t('no-route-found_part2') }</Link> { t('no-route-found_part3') }</p>
            </div>
        </div>
      )

  return (
    <div>
        <div className='mt-[3rem] max-w-[82.75rem] mx-auto w-full flex flex-col gap-[1rem]'>
        {
            extractDate(routes[0].departure) !== searchParams.get('depdate') && (
                <div className='md:max-w-[82.75rem] max-w-[29.5rem] py-[2rem] px-[1.5rem] rounded-[1rem]  mx-auto w-full flex items-center justify-center bg-red/20 border border-gray/25 shadow-custom'>
                    <div className='flex lg:gap-[0.25rem] gap-[0.333rem] text-left'>
                        <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='lg:size-[1rem] size-[1.333rem] mt-[0.25rem]' />
                        <p className=' text-dark-gray lg:text-[1rem] text-[1.333rem] font-open-sans'>{ t('no-matching-route') }</p>
                    </div>
                
                </div>
            )
        }

        {/* Mobile routes */}
        <MobileReturnRoutesContainer routes={routes} setSelectedRoutes={setSelectedRoutes}/>

        {
            routes.map((route, index) => (
                <div className='w-full max-lg:hidden bg-light-white border border-gray/25 hover:border-red transition-colors duration-300 shadow-custom rounded-[1rem] px-[4rem] py-[2rem]' key={index}>
                    <div className='h-[5.5rem] flex justify-between items-center'>
                        <div className='h-full flex flex-col justify-between'>
                            <div className='flex items-center font-open-sans font-[400] text-[1rem] text-dark-gray line-clamp-1 text-nowrap'>
                                <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p className={`mr-[1rem] ${ extractDate(routes[0].departure) === searchParams.get('depdate') && "text-red font-bold" }`}>{ `${getDayOfTheWeek(parseDate(route.departure).dayOfWeek)}, ${parseDate(route.departure).dayOfMonth} ${getMonthText(parseDate(route.departure).month)}`}</p>
                                <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p>{ parseDate(route.departure).timeString }</p>
                            </div>
                            <div className='flex items-center font-open-sans font-[400] text-[1rem] text-dark-gray line-clamp-1 text-nowrap'>
                                <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p className='mr-[1rem]'>{ `${getDayOfTheWeek(parseDate(route.arrival).dayOfWeek)}, ${parseDate(route.arrival).dayOfMonth} ${getMonthText(parseDate(route.arrival).month)}`}</p>
                                <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p>{ parseDate(route.arrival).timeString }</p>
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
                                    <p className='text-[1rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ route.route.stops[0].label[getLocale(locale)] }</p>
                                    <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                    <p className='text-[0.875rem] text-dark-gray'>{ route.route.stops[0].city === 'chisinau' ? t('street') : t('pass-req') }</p>
                                </div>
                                <div className='flex items-center font-open-sans font-[400]'>
                                    <p className='text-[1rem] text-gray/75 mr-[0.5rem]'>{ t('finish') }:</p>
                                    <p className='text-[1rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ route.route.stops[route.route.stops.length - 1].label[getLocale(locale)] }</p>
                                    <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                    <p className='text-[0.875rem] text-red'>{ route.route.stops[route.route.stops.length - 1].city === 'chisinau' ? t('street') : t('pass-req') }</p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-[0.25rem] justify-center mr-[1.5rem]'>
                                <div className='flex items-center gap-[0.5rem] justify-center'>
                                    <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" draggable={false} className='size-[1rem]' />
                                    <p className='font-open-sans font-bold text-[1rem] text-dark-gray'>{ route.free_places }</p>
                                </div>
                                <p className='text-[1rem] font-[400] font-open-sans text-gray/75 line-clamp-1 text-nowrap'>{ t('free-spaces') }</p>
                            </div>

                            <div className='flex justify-between flex-1'>
                                <div className='flex flex-col gap-[0.25rem] justify-center mr-[1.5rem]'>
                                    <p className='font-open-sans font-bold text-[1.5rem] text-dark-gray uppercase text-center'>{ route.price.adult }<span className='text-[1rem]'>eur</span></p>
                                    <p className='text-[0.875rem] font-bold font-open-sans text-red text-center line-clamp-1 text-nowrap'>* { t('payment-info') }</p>
                                </div>

                                <div className='flex flex-col items-center justify-between'>
                                    <div onClick={() => setSelectedRoutes(prev => ({
                                        ...prev,
                                        returnRoute: route
                                        }))}
                                    >
                                        <RedButton text={t('book')} iconURL='/icons/route-card-icons/icon-checkmark.svg'/>
                                    </div>

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
    </div>
  )
}

export default ReturnRoutesContainer