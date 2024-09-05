'use client'

import ModalWindow from '@/components/SharedComponents/ModalWindow'
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import RouteModalSelect from './RouteModalSelect';
import RouteModalDatePicker from './RouteModalDatePicker';
import { Travel } from '../../AdminRoutesContent';
import RouteModalInfo from './RouteModalInfo';

export interface CoordinatePair{
  start: {
    lat: number;
    lon: number;
  },
  end: {
    lat: number;
    lon: number;
  }
}

interface RoutePatchModalProps{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalGoal: "update" | "add";
  travel : Travel | null;
}

const RoutePatchModal:React.FC<RoutePatchModalProps> = ({ isOpen, setIsOpen, modalGoal, travel }) => {

  const t = useTranslations("AdminRoutes")

  const extractDate = ( textDate: string ) => {
    const date = new Date(textDate);
    const dateString = date.toISOString().split('T')[0];

    return dateString
  }

  const extractHour = (textDate: string) => {
    const date = new Date(textDate);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  }

  const tourCoordinatePair : CoordinatePair = {
    start: {
      lat: 47.0245117,
      lon: 28.8322923
    },
    end: {
       lat: 46.2017559,
       lon: 6.1466014
    }
  }

  const returnCoordinatePair : CoordinatePair = {
    start: {
      lat: 46.2017559,
      lon: 6.1466014
    },
    end: {
      lat: 47.0245117,
      lon: 28.8322923
    }
  }

  const [direction, setDirection] = useState<CoordinatePair | null>(null)


  useEffect(() => {
    if(travel){
      if(Number(travel.route.stops[0].lat) === tourCoordinatePair.start.lat && Number(travel.route.stops[0].lon) === tourCoordinatePair.start.lon){
        setDirection(tourCoordinatePair)
      } else {
        setDirection(returnCoordinatePair)
      }
    }
  }, [travel])
  
  const [routeDate, setRouteDate] = useState(travel ? extractDate(travel.departure) : '')
  const [hour, setHour] = useState(travel ? extractHour(travel.departure) : '')

  useEffect(() => {
    if(isOpen === false){
      if(travel){
        if(Number(travel.route.stops[0].lat) === tourCoordinatePair.start.lat && Number(travel.route.stops[0].lon) === tourCoordinatePair.start.lon){
          setDirection(tourCoordinatePair)
        } else {
          setDirection(returnCoordinatePair)
        }

        setRouteDate(extractDate(travel.departure))
        setHour(extractHour(travel.departure))
      } else {
        setDirection(null)
        setRouteDate('')
        setHour('')
      }
    }
  }, [isOpen])

  return (
    <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={70}>
      <div className='pt-[4rem] px-[3rem] pb-[2rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <div className='grid xl:grid-cols-4 grid-cols-2 gap-[1rem]'>
          <RouteModalSelect direction={direction} setDirection={setDirection} tourCoord={tourCoordinatePair} returnCoord={returnCoordinatePair}/>
          <RouteModalDatePicker routeDate={routeDate} setRouteDate={setRouteDate}/>
          <div className='relative'>
            <img src="/icons/admin-icons/icon-clock-dark.svg" alt="clock" draggable={false} className='xl:size-[1rem] size-[1.333rem] absolute right-[1.5rem]  top-[50%] -translate-y-[50%]' />
            <input type="text" maxLength={5} value={hour} onChange={(e) => setHour(e.target.value)} placeholder={t('departure-hour') } className='font-open-sans xl:text-[1rem] text-[1.333rem] xl:h-[3.5rem] h-[4rem] border pl-[1.5rem] outline-none border-gray/25 rounded-[0.5rem] bg-light-white w-full'/>
          </div>
          <button className='xl:h-[3.5rem] h-[4rem] bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem] flex items-center justify-center px-[1.5rem] gap-[0.5rem]'>
            <img src="/icons/route-card-icons/icon-checkmark.svg" alt="check" className='xl:size-[1.125rem] size-[1.5rem]' />
            <p className='text-light-white xl:text-[1.125rem] text-[1.5rem] font-bold'>{ modalGoal === "update" ? t('update') : t('add') }</p>
          </button>
        </div>

        {
          direction && <RouteModalInfo direction={direction} travel={travel} />
        }
      </div>
    </ModalWindow>
  )
}

export default RoutePatchModal