import React, { useEffect, useState } from 'react'
import { Travel } from '../../AdminRoutesContent'
import { CoordinatePair } from './RoutePatchModal';
import ItineraryMap from '@/components/SharedComponents/ItineraryMap';
import { Coordinate } from '@/constants/coordinates';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { isSameCoordinatePair } from './RouteModalSelect';
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText';

interface RouteModalInfoProps{
    travel: Travel | null;
    direction: CoordinatePair | null;
    fetchTravels: () => Promise<void>;
}

const RouteModalInfo:React.FC<RouteModalInfoProps> = ({ travel, direction, fetchTravels }) => {

    const prices_t = useTranslations("Services")
    const t = useTranslations("RouteSearchPage")
    const delete_t = useTranslations("AdminRoutes")

    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const toDegrees = (radians: number) => (radians * 180) / Math.PI;
  
  
    const getMidpoint = (coords: Coordinate[]): Coordinate => {
      let x = 0;
      let y = 0;
      let z = 0;
    
      coords.forEach(coord => {
        const lat = toRadians(coord.latitude);
        const long = toRadians(coord.longitude);
    
        x += Math.cos(lat) * Math.cos(long);
        y += Math.cos(lat) * Math.sin(long);
        z += Math.sin(lat);
      });
    
      const total = coords.length;
    
      x /= total;
      y /= total;
      z /= total;
    
      const lon = Math.atan2(y, x);
      const hyp = Math.sqrt(x * x + y * y);
      const lat = Math.atan2(z, hyp);
    
      return {
        latitude: toDegrees(lat),
        longitude: toDegrees(lon),
      };
    };

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

      async function deleteTravel(travelId: string) {
            const response = await fetch('/api/travel', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: travelId }),
            });
        
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Error: ${error.msg}`);
            }
        
            const data = await response.json();
            await fetchTravels()
        }

    const handleClick = async () => {
        if(travel && travel.id){
            deleteTravel(travel.id)
        }
    }


  return (
    <div 
        className='w-full overflow-hidden'
        // initial={{ height: 0 }}
        // animate={{ height: "auto"}}
        // transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
    >
        <div className="relative mt-[2rem] pt-[2rem] border-t border-gray/25 flex xl:flex-row flex-col-reverse items-start justify-between">
        {
            travel && travel.id && (
                <div className='absolute right-0 bottom-0 flex items-center gap-[0.25rem]' onClick={handleClick}>
                    <img src="/icons/route-card-icons/icon-delete.svg" alt="delete" className='lg:size-[1rem] size-[1.333rem]' />
                    <UnderlinedText text={delete_t('delete-route')}/>
                </div>
            )
        }
            <div className="flex md:flex-row flex-col-reverse xl:gap-[3rem] gap-[2rem] max-xl:justify-between xl:flex-1 max-xl:w-full">
                <div className="md:h-[16rem] h-[27rem] xl:min-w-[23rem] md:min-w-[24rem] min-w-full rounded-[0.5rem] overflow-hidden border border-gray/25 shadow-custom">
                    <ItineraryMap 
                    center={[
                        getMidpoint([{latitude: direction!.start.lat, longitude: direction!.start.lon}, {latitude: direction!.end.lat, longitude: direction!.end.lon}]).latitude, 
                        getMidpoint([{latitude: direction!.start.lat, longitude: direction!.start.lon}, {latitude: direction!.end.lat, longitude: direction!.end.lon}]).longitude
                    ]} 
                    coordinates={[{latitude: direction!.start.lat, longitude: direction!.start.lon}, {latitude: direction!.end.lat, longitude: direction!.end.lon}]}/>
                </div>

                <div className="font-open-sans max-xl:mb-[2rem] flex flex-col gap-[1rem]">
                <div className="flex gap-[0.5rem] items-center">
                    <p className="xl:text-[1rem] text-[1.333rem] text-gray/75 font-[400]">{ t('free-spaces') }:</p>
                    <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" draggable={false} className="size-[1rem]" />
                    <p className="xl:text-[1rem] text-[1.333rem] text-dark-gray font-bold">{ travel ? travel.free_places : 50 }</p>
                </div>

                <div className="flex gap-[0.5rem] items-center">
                    <p className="xl:text-[1rem] text-[1.333rem] text-gray/75 font-[400]">{ t('duration') }:</p>
                    <p className="xl:text-[1rem] text-[1.333rem] text-dark-gray font-bold">{ travel ? travel.route.stops[travel.route.stops.length - 1].hours : 30 } { t('hours') }</p>
                </div>

                <div className="flex gap-[0.5rem]">
                    <p className="xl:text-[1rem] text-[1.333rem] text-gray/75 font-[400]">{ t('amenities') }:</p>
                    <div className="flex xl:flex-col flex-row gap-[0.5rem]">
                        <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-wifi-disabled.svg" alt="wifi" draggable={false} className="xl:size-[1rem] size-[1.333rem]" />
                                <p className="max-xl:hidden">{ t('wifi') }</p>
                            </div>
                            <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-wc-disabled.svg" alt="wc" draggable={false} className="xl:size-[1rem] size-[1.333rem]" />
                                <p className="max-xl:hidden">{ t('wc') }</p>
                            </div>
                            <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-ac-disabled.svg" alt="ac" draggable={false} className="xl:size-[1rem] size-[1.333rem]" />
                                <p className="max-xl:hidden">{ t('ac') }</p>
                            </div>
                            <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-socket-disabled.svg" alt="socket" draggable={false} className="xl:size-[1rem] size-[1.333rem]" />
                                <p className="max-xl:hidden">{ t('socket') }</p>
                            </div>
                            <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-minibar-disabled.svg" alt="minibar" draggable={false} className="xl:size-[1rem] size-[1.333rem]" />
                                <p className="max-xl:hidden">{ t('minibar') }</p>
                            </div>
                            <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-multimedia-disabled.svg" alt="multimedia" draggable={false} className="xl:size-[1rem] size-[1.333rem]" />
                                <p className="max-xl:hidden">{ t('multimedia') }</p>
                            </div>
                    </div>
                </div>
            </div>
            </div>

            <div className="xl:max-w-[18.75rem] max-w-[27rem] w-full max-xl:mx-auto max-xl:mb-[2rem]">
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-adult.svg" alt="adult" draggable={false} className="xl:size-[1rem] size-[1.333rem] mr-[0.25rem]" />
                                <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ prices_t('passenger1Title') }</p>
                            </div>
                            <p className="font-bold xl:text-[1.5rem] text-[2rem]">
                                { 150 }
                                <span className="xl:text-[1rem] text-[1.333rem] uppercase">eur</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-child.svg" alt="child" draggable={false} className="xl:size-[1rem] size-[1.333rem] mr-[0.25rem]" />
                                <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ prices_t('passenger2Title') } <span className="font-[400]">- { prices_t('passenger2info') }</span></p>
                            </div>
                            <p className="font-bold xl:text-[1.5rem] text-[2rem]">
                                { 80 }
                                <span className="xl:text-[1rem] text-[1.333rem] uppercase">eur</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-student.svg" alt="student" draggable={false} className="xl:size-[1rem] size-[1.333rem] mr-[0.25rem]" />
                                <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ prices_t('passenger3Title') } <span className="font-[400]">- { prices_t('passenger3info') }</span></p>
                            </div>
                            <p className="font-bold xl:text-[1.5rem] text-[2rem]">
                                { 120 }
                                <span className="xl:text-[1rem] text-[1.333rem] uppercase">eur</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-luggage.svg" alt="luggage" draggable={false} className="xl:size-[1rem] size-[1.333rem] mr-[0.25rem]" />
                                <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ prices_t('passenger4Title') } <span className="font-[400]">- { prices_t('passenger4info') }</span> </p>
                            </div>
                            <p className="font-bold xl:text-[1.5rem] text-[2rem]">{ prices_t('free') }</p>
                        </div>
                </div>

        </div>
    </div>
  )
}

export default RouteModalInfo