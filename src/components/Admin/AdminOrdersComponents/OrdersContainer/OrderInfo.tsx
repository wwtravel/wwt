'use client'

import { motion } from "framer-motion"
import { Order } from "../AdminOrdersContent";
import { useLocale, useTranslations } from "next-intl";

interface OrderInfoProps{
    order : Order;
}

const OrderInfo:React.FC<OrderInfoProps> = ({ order }) => {

    const t = useTranslations("AdminOrders")
    const date_t = useTranslations("RouteSearchPage_Date")
    const route_t = useTranslations("RouteSearchPage")


    const locale = useLocale()


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
    <motion.div
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
        className="overflow-y-hidden"
    >
        <div className="mt-[2rem] pt-[2rem] border-t border-gray/25 flex xl:flex-row flex-col xl:items-start xl:justify-between items-center max-xl:gap-[2rem]">
            <div className="flex-1 flex flex-col gap-[0.25rem]">
                {
                    order.passengers.map((passenger, index) => (
                        <div className="flex items-center gap-[0.5rem]" key={index}>
                            <p className="font-open-sans text-gray/75 font-[400] xl:text-[1rem] text-[1.333rem]">{ t('pass-order-number') }{ index + 1 }</p>
                            <p className="font-open-sans text-dark-gray font-bold xl:text-[1rem] text-[1.333rem]">{ passenger.lastname } { passenger.firstname }</p>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-stretch lg:flex-row flex-col gap-[1.5rem]">
                <div className="flex flex-col justify-between flex-1 w-fit">
                    <div className='flex items-center font-open-sans font-[400] xl:text-[1rem] text-[1.333rem] text-dark-gray line-clamp-1 text-nowrap w-fit'>
                        <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='xl:size-[1rem] size-[1.333rem] mr-[0.5rem]' />
                        <p className={`mr-[1rem]`}>{ `${getDayOfTheWeek(parseDate(order.departure_date).dayOfWeek)}, ${parseDate(order.departure_date).dayOfMonth} ${getMonthText(parseDate(order.departure_date).month)}`}</p>
                        <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='xl:size-[1rem] size-[1.333rem] mr-[0.5rem]' />
                        <p>{ parseDate(order.departure_date).timeString }</p>
                    </div>
                    <div className='flex items-center font-open-sans font-[400] xl:text-[1rem] text-[1.333rem] text-dark-gray line-clamp-1 text-nowrap'>
                        <img src="/icons/route-card-icons/icon-calendar.svg" alt="calendar" draggable={false} className='xl:size-[1rem] text-[1.333rem] mr-[0.5rem] w-fit' />
                        <p className={`mr-[1rem]`}>{ `${getDayOfTheWeek(parseDate(order.arrival_date).dayOfWeek)}, ${parseDate(order.arrival_date).dayOfMonth} ${getMonthText(parseDate(order.arrival_date).month)}`}</p>
                        <img src="/icons/route-card-icons/icon-clock.svg" alt="time" draggable={false} className='xl:size-[1rem] size-[1.333rem] mr-[0.5rem]' />
                        <p>{ parseDate(order.arrival_date).timeString }</p>
                    </div>
                </div>

                <div className="flex items-stretch gap-[0.5rem]">
                    <div className='flex flex-col items-center mr-[0.5rem] py-[0.2rem] h-[5.5rem] flex-1 max-lg:hidden'>
                        <img src="/icons/route-card-icons/icon-start-point.svg" alt="start" draggable={false} className='xl:size-[1rem] size-[1.333rem]' />
                        <div className='w-[2px] h-full bg-gray/50'/>
                        <img src="/icons/route-card-icons/icon-finish-point.svg" alt="start" draggable={false} className='xl:size-[1rem] size-[1.333rem]' />
                    </div>

                    <div className='flex flex-col justify-between max-lg:items-center mr-[2rem] flex-1 h-full'>
                        <div className='flex items-center font-open-sans font-[400]'>
                            <p className='xl:text-[1rem] text-[1.333rem] text-gray/75 mr-[0.5rem]'>{ route_t('start') }:</p>
                            <p className='xl:text-[1rem] text-[1.333rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ order.departure_place.label[getLocale(locale)] }</p>
                        </div>
                        <div className='flex items-center font-open-sans font-[400]'>
                            <p className='xl:text-[1rem] text-[1.333rem] text-gray/75 mr-[0.5rem]'>{ route_t('finish') }:</p>
                            <p className='xl:text-[1rem] text-[1.333rem] text-dark-gray mr-[0.5rem] line-clamp-1 text-nowrap'>{ order.arrival_place.label[getLocale(locale)] }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default OrderInfo