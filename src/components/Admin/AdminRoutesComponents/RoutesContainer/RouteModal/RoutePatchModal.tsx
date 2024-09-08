'use client'

import ModalWindow from '@/components/SharedComponents/ModalWindow'
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import RouteModalSelect from './RouteModalSelect';
import RouteModalDatePicker from './RouteModalDatePicker';
import { Travel } from '../../AdminRoutesContent';
import RouteModalInfo from './RouteModalInfo';
import { toast } from 'sonner';
import PulseLoader from 'react-spinners/PulseLoader';

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
  fetchTravels: () => Promise<void>;
  reservedSeats: number;
}

const RoutePatchModal:React.FC<RoutePatchModalProps> = ({ isOpen, setIsOpen, modalGoal, travel, fetchTravels, reservedSeats }) => {

  const t = useTranslations("AdminRoutes")

  const [loading, setLoading] = useState(false)

  const postTravel = async (departure: string, routeId : string) => {
    try {
        setLoading(true)
        const response = await fetch('/api/travel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{
              departure: departure,
              route_id: routeId
            }]),
        });

        const result = await response.json();

        if (response.ok) {
            setLoading(false)
            setIsOpen(false)
            console.log('Travel created successfully:', result.msg);
        } else {
            setLoading(false)
            console.error('Error creating travel:', result.msg);
        }
    } catch (error) {
        setLoading(false)
        console.error('Error during POST request:', error);
    }
};

  const patchTravel = async (id: string, departure: string, route_id: string, reserved_seats: number) => {
    const travelData = {
        id: id,
        departure: departure,
        route_id: route_id,
        reserved_seats: reserved_seats
    };

    try {
        setLoading(true)
        const response = await fetch('/api/travel', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(travelData),
        });

        if (!response.ok) {
            setLoading(false)
            toast( t('general-err-title'), {
              description: t('general-err-desc'),
              action: {
                label: t('close'),
                onClick: () => {}
              }
            })
            const errorResponse = await response.json();
            console.error('Error updating travel:', errorResponse.msg);
        } else {
            setLoading(false)
            const successResponse = await response.json();
            console.log('Travel updated successfully:', successResponse.msg);
        }
    } catch (error) {
        setLoading(false)
        toast( t('general-err-title'), {
          description: t('general-err-desc'),
          action: {
            label: t('close'),
            onClick: () => {}
          }
        })
        console.error('Failed to update travel:', error);
    }
};

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
  const [routeId ,setRouteId] = useState<"66bdf14adeebbbbeceb9d4e1" | "66d2f669fef2e73006a937af" | "">("")


  useEffect(() => {
    if(travel){
      if(Number(travel.route.stops[0].lat) === tourCoordinatePair.start.lat && Number(travel.route.stops[0].lon) === tourCoordinatePair.start.lon){
        setDirection(tourCoordinatePair)
      } else {
        setDirection(returnCoordinatePair)
      }
    }
  }, [travel])

  useEffect(() => {
    if(direction){
      if(direction.start.lat === tourCoordinatePair.start.lat && direction.start.lon === tourCoordinatePair.start.lon){
        setRouteId("66bdf14adeebbbbeceb9d4e1")
      } else {
        setRouteId("66d2f669fef2e73006a937af")
      }
    }
  }, [direction])
  
  const [routeDate, setRouteDate] = useState(travel ? extractDate(travel.departure) : '')
  const [hour, setHour] = useState(travel ? extractHour(travel.departure) : '')

  useEffect(() => {
    if(isOpen === false){
      setDateErr(false)
      setDirectionErr(false)
      setHourErr(false)
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

  const [directionErr, setDirectionErr] = useState(false)
  const [dateErr, setDateErr] = useState(false)
  const [hourErr, setHourErr] = useState(false)

  const handleClick = async () => {

    setDateErr(false)
    setDirectionErr(false)
    setHourErr(false)

    if(!direction){
      setDirectionErr(true)
      toast( t('direction-req-title'), {
        description: t('direction-req-desc'),
        action: {
          label: t('close'),
          onClick: () => {}
        }
      })
      return
    }

    if(routeDate === ''){
      setDateErr(true)
      toast( t('date-req-title'), {
        description: t('date-req-desc'),
        action: {
          label: t('close'),
          onClick: () => {}
        }
      })
      return
    }

    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if(hour === '' || !regex.test(hour)){
      setHourErr(true)
      toast( t('hour-req-title'), {
        description: t('hour-req-desc'),
        action: {
          label: t('close'),
          onClick: () => {}
        }
      })
      return
    }

    const dateTimeString = `${routeDate}T${hour}:00`;
    const localDateTime = new Date(dateTimeString);
    const isoDateTime = localDateTime.toISOString();

    if (modalGoal === "update") {
      await patchTravel(travel!.id, isoDateTime, routeId, reservedSeats);

      await fetchTravels();
    } else {
      await postTravel(isoDateTime, routeId);

      await fetchTravels();
    }
  }

  return (
    <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={70}>
      <div className='pt-[4rem] px-[3rem] pb-[2rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <div className='grid xl:grid-cols-4 grid-cols-2 gap-[1rem]'>
          <RouteModalSelect err={directionErr} direction={direction} setDirection={setDirection} tourCoord={tourCoordinatePair} returnCoord={returnCoordinatePair}/>
          <RouteModalDatePicker err={dateErr} routeDate={routeDate} setRouteDate={setRouteDate}/>
          <div className='relative'>
            <img src="/icons/admin-icons/icon-clock-dark.svg" alt="clock" draggable={false} className='xl:size-[1rem] size-[1.333rem] absolute right-[1.5rem]  top-[50%] -translate-y-[50%]' />
            <input type="text" maxLength={5} value={hour} onChange={(e) => setHour(e.target.value)} placeholder={t('departure-hour') } className={`${hourErr && 'animate-input-error'} font-open-sans xl:text-[1rem] text-[1.333rem] xl:h-[3.5rem] h-[4rem] border pl-[1.5rem] outline-none border-gray/25 rounded-[0.5rem] bg-light-white w-full`}/>
          </div>
          <button className='xl:h-[3.5rem] h-[4rem] bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem] flex items-center justify-center px-[1.5rem] gap-[0.5rem]' onClick={handleClick}>
              {
                loading ? (
                  <div>
                    <PulseLoader 
                        size={5}
                        color="#FCFEFF"
                    />
                  </div>
                ) : (
                  <>
                    <img src="/icons/route-card-icons/icon-checkmark.svg" alt="check" className='xl:size-[1.125rem] size-[1.5rem]' />
                    <p className='text-light-white xl:text-[1.125rem] text-[1.5rem] font-bold'>
                            { modalGoal === "update" ? t('update') : t('add-btn') }
                    </p>
                  </>
                )
              }
          </button>
        </div>

        {
          direction ? <RouteModalInfo direction={direction} travel={travel} />
          : (
            <div className='w-full h-[20rem] grid place-content-center px-[3rem]'>
                <p className='mb-[2rem] text-gray/75 text-[1rem]'>{ t('fill-in-data') }</p>
            </div>
          )
        }
      </div>
    </ModalWindow>
  )
}

export default RoutePatchModal