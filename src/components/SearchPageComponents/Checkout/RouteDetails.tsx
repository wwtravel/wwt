import { SelectedRoutes } from '@/app/[locale]/route-search/PageContent';
import { Travel } from '@/types/routeType'
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'
import UnderlinedText from '../SearchPageContent/UnderlinedText';

interface RouteDetailsProps{
    route: Travel;
    setSelectedRoutes: React.Dispatch<React.SetStateAction<SelectedRoutes>>;
    routeType: "departure" | "return";
}

const RouteDetails: React.FC<RouteDetailsProps> = ({ route, setSelectedRoutes, routeType }) => {

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

  return (
        <div className="md:px-[1rem] px-[1.333rem] md:py-[1.5rem] py-[2rem] bg-light-white border border-gray/25 md:rounded-[1rem] rounded-[1.333rem]">
            <div className="flex flex-col md:gap-[0.25rem] gap-[0.333rem]">
                <div className="flex md:gap-[0.5rem] gap-[0.667rem]">
                    <div className='flex flex-col items-center h-full md:pt-[2rem] pt-[2.667rem]'>
                        <img src="/icons/route-card-icons/icon-start-point.svg" alt="start" draggable={false} className='md:size-[1.125rem] size-[1.5rem]' />
                        <div className='w-[2px] md:h-[5.1rem] h-[6.75rem] bg-gray/50'/>
                        <img src="/icons/route-card-icons/icon-finish-point.svg" alt="start" draggable={false} className='md:size-[1.125rem] size-[1.5rem]' />
                    </div>

                    <div>
                        <div className='flex items-center font-open-sans font-[400] md:text-[1rem] text-[1.333rem] text-dark-gray line-clamp-1 text-nowrap mb-[0.25rem]'>
                            <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='md:size-[1rem] size-[1.333rem] md:mr-[0.5rem] mr-[0.667rem]' />
                            <p className={`md:mr-[1rem] mr-[1.333rem]`}>{ `${getDayOfTheWeek(parseDate(route.departure).dayOfWeek)}, ${parseDate(route.departure).dayOfMonth} ${getMonthText(parseDate(route.departure).month)}`}</p>
                            <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='md:size-[1rem] size-[1.333rem] md:mr-[0.5rem] mr-[0.667rem]' />
                            <p>{ parseDate(route.departure).timeString }</p>
                        </div>
                        <div className='flex items-center font-open-sans font-[400]'>
                            <p className='md:text-[1rem] text-[1.333rem] text-gray/75 md:mr-[0.5rem] mr-[0.667rem]'>{ t('start') }:</p>
                            <p className='md:text-[1rem] text-[1.333rem] text-dark-gray md:mr-[0.5rem] mr-[0.667rem] text-nowrap'>{ route.route.stops[0].label[getLocale(locale)] }</p>
                            <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='md:size-[1rem] size-[1.333rem] md:mr-[0.5rem] mr-[0.667rem]' />
                            <p className='md:text-[0.875rem] text-[1.167rem] text-dark-gray h-[1rem] leading-[1]'><span className={`align-super ${route.route.stops[0].city === 'chisinau' ? 'text-dark-gray' : "text-red"}`}>{ route.route.stops[0].city === 'chisinau' ? t('street') : t('pass-req') }</span></p>
                        </div>
                        <div className='flex md:mt-[3rem] mt-[4rem] items-center font-open-sans font-[400] md:text-[1rem] text-[1.333rem] text-dark-gray line-clamp-1 text-nowrap'>
                            <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='md:size-[1rem] size-[1.333rem] md:mr-[0.5rem] mr-[0.667rem]' />
                            <p className='md:mr-[1rem] mr-[1.333rem]'>{ `${getDayOfTheWeek(parseDate(route.arrival).dayOfWeek)}, ${parseDate(route.arrival).dayOfMonth} ${getMonthText(parseDate(route.arrival).month)}`}</p>
                            <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='md:size-[1rem] size-[1.333rem] md:mr-[0.5rem] mr-[0.667rem]' />
                            <p>{ parseDate(route.arrival).timeString }</p>
                        </div>
                        <div className='flex items-center font-open-sans font-[400] md:mt-[0.25rem] mt-[0.333rem]'>
                            <p className='md:text-[1rem] text-[1.333rem] text-gray/75 md:mr-[0.5rem] mr-[0.667rem]'>{ t('finish') }:</p>
                            <p className='md:text-[1rem] text-[1.333rem] text-dark-gray md:mr-[0.5rem] mr-[0.667rem] text-nowrap'>{ route.route.stops[route.route.stops.length - 1].label[getLocale(locale)] }</p>
                            <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='md:size-[1rem] size-[1.333rem] md:mr-[0.5rem] mr-[0.667rem]' />
                            <p className='md:text-[0.875rem] text-[1.167rem]   h-[1rem] leading-[1]'><span className={`align-super ${route.route.stops[route.route.stops.length - 1].city === 'chisinau' ? 'text-dark-gray' : "text-red"}`}>{ route.route.stops[route.route.stops.length - 1].city === 'chisinau' ? t('street') : t('pass-req') }</span></p>
                        </div>
                    </div>
                </div>

                        <div className='flex md:gap-[0.25rem] gap-[0.333rem] items-center justify-center cursor-pointer md:mt-[1.5rem] mt-[2rem]' onClick={() => {
                            if( routeType === "departure" ){
                                setSelectedRoutes(prev => ({ 
                                    ...prev,
                                    departureRoute: null,
                                    returnRoute: null
                                }))
                            }
                            if(routeType === "return"){
                                setSelectedRoutes(prev => ({ 
                                    ...prev,
                                    returnRoute: null
                                }))
                            }
                        }}
                        >
                            <img src="/icons/route-card-icons/icon-pencil.svg" alt="edit" draggable={false} className='md:size-[1rem] size-[1.333rem]' />
                            <UnderlinedText text={ routeType === 'departure' ? t('change-departure') : t('change-return') }/>
                        </div>
            </div>

    </div>
  )
}

export default RouteDetails