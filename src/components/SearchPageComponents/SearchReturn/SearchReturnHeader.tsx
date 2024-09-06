'use client'


import { useLocale, useTranslations } from 'next-intl'
import RouteSearch from '@/components/SharedComponents/RouteSearch'
import MobileRouteSearch from '@/components/SharedComponents/MobileRouteSearch'
import { Travel } from '@/types/routeType'
import { SelectedRoutes } from '@/app/[locale]/route-search/PageContent'
import UnderlinedText from '../SearchPageContent/UnderlinedText'
import { useEffect } from 'react'
import { scrollToSection } from '@/utils/otherFunctions'
import { useStore } from 'zustand'
import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import { useCurrencyRates } from '@/hooks/useCurrencyRates'
import { roundCurrency } from '@/components/HomePageComponents/Destinations/DestinationPrice'

interface SearchReturnHeaderProps{
  seletcedRoute : Travel;
  setSelectedRoutes: React.Dispatch<React.SetStateAction<SelectedRoutes>>;
}

const SearchReturnHeader:React.FC<SearchReturnHeaderProps> = ({ seletcedRoute, setSelectedRoutes }) => {

  const currency = useStore(useCurrencyStore, (state) => state.currency)

  const { rates, loading, error } = useCurrencyRates();

  const locale = useLocale()

  useEffect(() => {
    scrollToSection('scroll')
  })

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
    <div className="relative lg:h-[24.75rem] max-lg:pb-[2.667rem] md:bg-[url('/images/header_bg.png')] bg-center bg-cover lg:px-[12rem] px-[1rem] lg:pt-[30vh] pt-[13.75rem]">

        <div id='scroll' className='absolute left-0 lg:bottom-[6.25rem] bottom-[4rem]'/>

          <div className='absolute max-lg:hidden bottom-0 left-[50%] -translate-x-[50%] max-w-[82.75rem] mx-auto w-full h-[9.5rem] rounded-[1rem] overflow-hidden border border-gray/25 shadow-custom   translate-y-[50%]'>
            <div className='w-full max-lg:hidden bg-light-white px-[4rem] py-[2rem]' >
                <div className='h-[5.5rem] flex justify-between items-center'>
                    <div className='h-full flex flex-col justify-between'>
                        <div className='flex items-center font-open-sans font-[400] text-[1rem] text-dark-gray line-clamp-1 text-nowrap'>
                            <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                            <p className={`mr-[1rem]`}>{ `${getDayOfTheWeek(parseDate(seletcedRoute.departure).dayOfWeek)}, ${parseDate(seletcedRoute.departure).dayOfMonth} ${getMonthText(parseDate(seletcedRoute.departure).month)}`}</p>
                            <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                            <p>{ parseDate(seletcedRoute.departure).timeString }</p>
                        </div>
                        <div className='flex items-center font-open-sans font-[400] text-[1rem] text-dark-gray line-clamp-1 text-nowrap'>
                            <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                            <p className='mr-[1rem]'>{ `${getDayOfTheWeek(parseDate(seletcedRoute.arrival).dayOfWeek)}, ${parseDate(seletcedRoute.arrival).dayOfMonth} ${getMonthText(parseDate(seletcedRoute.arrival).month)}`}</p>
                            <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                            <p>{ parseDate(seletcedRoute.arrival).timeString }</p>
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
                                <p className='text-[1rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ seletcedRoute.route.stops[0].label[getLocale(locale)] }</p>
                                <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p className='text-[0.875rem] text-dark-gray'>{ seletcedRoute.route.stops[0].city === 'chisinau' ? t('street') : t('pass-req') }</p>
                            </div>
                            <div className='flex items-center font-open-sans font-[400]'>
                                <p className='text-[1rem] text-gray/75 mr-[0.5rem]'>{ t('finish') }:</p>
                                <p className='text-[1rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ seletcedRoute.route.stops[seletcedRoute.route.stops.length - 1].label[getLocale(locale)] }</p>
                                <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1rem] mr-[0.5rem]' />
                                <p className='text-[0.875rem] text-red'>{ seletcedRoute.route.stops[seletcedRoute.route.stops.length - 1].city === 'chisinau' ? t('street') : t('pass-req') }</p>
                            </div>
                        </div>

                        <div className='flex justify-end gap-[3rem] flex-1'>
                            <div className='flex flex-col gap-[0.25rem] justify-center mr-[1.5rem]'>
                                <p className='font-open-sans font-bold text-[1.5rem] text-dark-gray uppercase text-center'>{ (rates && !loading && currency) ? roundCurrency(seletcedRoute.price.adult * rates[currency], currency) : seletcedRoute.price.adult }<span className='text-[1rem]'>{ (rates && !loading && currency) ? currency : "EUR" }</span></p>
                                <p className='text-[0.875rem] font-bold font-open-sans text-red text-center line-clamp-1 text-nowrap'>* { t('payment-info') }</p>
                            </div>

                            <div className='flex items-center gap-[0.25rem]' onClick={() => setSelectedRoutes(prev => ({ 
                                ...prev,
                                departureRoute: null
                             }))}>
                              <img src="/icons/route-card-icons/icon-pencil.svg" alt="edit" draggable={false} className='size-[1rem]' />
                              <UnderlinedText text={ t('change-departure') }/>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
          </div>

        <div className='lg:hidden'>
                <div className="px-[1.333rem] max-md:max-w-[29.5rem] max-md:mx-auto py-[2rem] bg-light-white border border-gray/25 rounded-[1.333rem]">
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
                                    <p className={`mr-[1.333rem]`}>{ `${getDayOfTheWeek(parseDate(seletcedRoute.departure).dayOfWeek)}, ${parseDate(seletcedRoute.departure).dayOfMonth} ${getMonthText(parseDate(seletcedRoute.departure).month)}`}</p>
                                    <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1.333rem] mr-[0.5rem]' />
                                    <p>{ parseDate(seletcedRoute.departure).timeString }</p>
                                </div>
                                <div className='flex items-center font-open-sans font-[400]'>
                                    <p className='text-[1.333rem] text-gray/75 mr-[0.667rem]'>{ t('start') }:</p>
                                    <p className='text-[1.333rem] text-dark-gray mr-[0.667rem] text-nowrap'>{ seletcedRoute.route.stops[0].label[getLocale(locale)] }</p>
                                    <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1.333rem] mr-[0.667rem]' />
                                    <p className='text-[1.167rem] text-dark-gray'>{ seletcedRoute.route.stops[0].city === 'chisinau' ? t('street') : t('pass-req') }</p>
                                </div>
                                <div className='flex mt-[4rem] items-center font-open-sans font-[400] text-[1.333rem] text-dark-gray line-clamp-1 text-nowrap'>
                                    <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='size-[1.333rem] mr-[0.667rem]' />
                                    <p className='mr-[1.333rem]'>{ `${getDayOfTheWeek(parseDate(seletcedRoute.arrival).dayOfWeek)}, ${parseDate(seletcedRoute.arrival).dayOfMonth} ${getMonthText(parseDate(seletcedRoute.arrival).month)}`}</p>
                                    <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='size-[1.333rem] mr-[0.667rem]' />
                                    <p>{ parseDate(seletcedRoute.arrival).timeString }</p>
                                </div>
                                <div className='flex items-center font-open-sans font-[400] mt-[0.333rem]'>
                                    <p className='text-[1.333rem] text-gray/75 mr-[0.667rem]'>{ t('finish') }:</p>
                                    <p className='text-[1.333rem] text-dark-gray mr-[0.667rem] text-nowrap'>{ seletcedRoute.route.stops[seletcedRoute.route.stops.length - 1].label[getLocale(locale)] }</p>
                                    <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1.333rem] mr-[0.667rem]' />
                                    <p className='text-[1.167rem] text-red h-[1.333rem] leading-[1]'>{ seletcedRoute.route.stops[seletcedRoute.route.stops.length - 1].city === 'chisinau' ? t('street') : t('pass-req') }</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-[1.5rem] flex-col items-center justify-center mt-[1rem]">
                            <div className='flex flex-col gap-[0.333rem] justify-center'>
                                <p className='font-open-sans font-bold text-[2rem] text-dark-gray uppercase text-center'>{ seletcedRoute.price.adult }<span className='text-[1.333rem]'>eur</span></p>
                                <p className='text-[1.167rem] font-bold font-open-sans text-red text-center line-clamp-1 text-nowrap'>* { t('payment-info') }</p>
                            </div>

                                <div className='flex gap-[0.333rem] items-center cursor-pointer' onClick={() => setSelectedRoutes(prev => ({ 
                                    ...prev,
                                    departureRoute: null
                                    }))}
                                >
                                    <img src="/icons/route-card-icons/icon-pencil.svg" alt="edit" draggable={false} className='size-[1rem]' />
                                    <UnderlinedText text={ t('change-departure') }/>
                                </div>
                        </div>
                    </div>

                </div>
        </div>

    </div>
  )
}

export default SearchReturnHeader