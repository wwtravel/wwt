'use client'

import ItineraryMap from "@/components/SharedComponents/ItineraryMap";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Coordinate{
    lat: number;
    long: number
}

interface Prices{
    adult : number
    child : number
    student : number
    luggage : number
}

interface Amenities {
    wifi: boolean;
    wc: boolean;
    ac: boolean;
    socket: boolean;
    minibar: boolean;
    multimedia: boolean;
}

interface RoutesContainerInfoProps{
    openRoutesIndexes: number[];
    routeIndex: number;
    startCityCoord : Coordinate;
    arrivalCityCoord : Coordinate;
    price: Prices;
    freePlaces : number;
    hoursInterval: number;
    amenities : Amenities;
}

const RoutesContainerInfo:React.FC<RoutesContainerInfoProps> = ({ openRoutesIndexes, routeIndex, arrivalCityCoord, startCityCoord, price, freePlaces, hoursInterval, amenities }) => {

  const prices_t = useTranslations("Services")
  const t = useTranslations("RouteSearchPage")

  const [open, setOpen] = useState(false)

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const toDegrees = (radians: number) => (radians * 180) / Math.PI;

const getMidpoint = (startCityCoord : Coordinate, arrivalCityCoord: Coordinate) => {
  const lat1 = toRadians(startCityCoord.lat);
  const long1 = toRadians(startCityCoord.long);
  const lat2 = toRadians(arrivalCityCoord.lat);
  const long2 = toRadians(arrivalCityCoord.long);

  const dLong = long2 - long1;

  const bx = Math.cos(lat2) * Math.cos(dLong);
  const by = Math.cos(lat2) * Math.sin(dLong);

  const midLat = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + bx) * (Math.cos(lat1) + bx) + by * by)
  );
  const midLong = long1 + Math.atan2(by, Math.cos(lat1) + bx);

  return {
    lat: toDegrees(midLat),
    long: toDegrees(midLong),
  };
};


  useEffect(() => {
    if(openRoutesIndexes.includes(routeIndex)) setOpen(true)
        else setOpen(false)
  }, [openRoutesIndexes])

  return (
    <motion.div 
        className='w-full overflow-hidden'
        animate={{ height: open ? "auto" : 0 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
    >
        <div className="mt-[2rem] pt-[2rem] border-t border-gray/25 flex items-start justify-between">
            <div className="flex gap-[3rem] flex-1">
                <div className="h-[16rem] min-w-[32rem] rounded-[0.5rem] overflow-hidden border border-gray/25 shadow-custom">
                    <ItineraryMap 
                        center={[getMidpoint(startCityCoord, arrivalCityCoord).lat, getMidpoint(startCityCoord, arrivalCityCoord).long]} 
                        coordinates={[
                            {latitude: startCityCoord.lat, longitude: startCityCoord.long},
                            {latitude: arrivalCityCoord.lat, longitude: arrivalCityCoord.long}
                        ]}/>
                </div>

                <div className="max-w-[18.75rem] w-full">
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-adult.svg" alt="adult" draggable={false} className="size-[1rem] mr-[0.25rem]" />
                                <p className="font-bold text-[1rem]">{ prices_t('passenger1Title') }</p>
                            </div>
                            <p className="font-bold text-[1.5rem]">
                                { price.adult }
                                <span className="text-[1rem] uppercase">eur</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-child.svg" alt="child" draggable={false} className="size-[1rem] mr-[0.25rem]" />
                                <p className="font-bold text-[1rem]">{ prices_t('passenger2Title') } <span className="font-[400]">- { prices_t('passenger2info') }</span></p>
                            </div>
                            <p className="font-bold text-[1.5rem]">
                                { price.child }
                                <span className="text-[1rem] uppercase">eur</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-student.svg" alt="student" draggable={false} className="size-[1rem] mr-[0.25rem]" />
                                <p className="font-bold text-[1rem]">{ prices_t('passenger3Title') } <span className="font-[400]">- { prices_t('passenger3info') }</span></p>
                            </div>
                            <p className="font-bold text-[1.5rem]">
                                { price.student }
                                <span className="text-[1rem] uppercase">eur</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-luggage.svg" alt="luggage" draggable={false} className="size-[1rem] mr-[0.25rem]" />
                                <p className="font-bold text-[1rem]">{ prices_t('passenger4Title') } <span className="font-[400]">- { prices_t('passenger4info') }</span> </p>
                            </div>
                            <p className="font-bold text-[1.5rem]">
                                {
                                    price.luggage === 0 
                                        ? prices_t('free')
                                        : (
                                            <span>
                                                { price.adult }
                                                <span className="text-[1rem] uppercase">eur</span>
                                            </span>
                                        )
                                }
                            </p>
                        </div>
                </div>
            </div>

            <div className="font-open-sans">
                <div className="flex gap-[0.5rem] items-center">
                    <p className="text-[1rem] text-gray/75 font-[400]">{ t('free-spaces') }:</p>
                    <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" draggable={false} className="size-[1rem]" />
                    <p className="text-[1rem] text-dark-gray font-bold">{ freePlaces }</p>
                </div>

                <div className="flex gap-[0.5rem] items-center mt-[1rem]">
                    <p className="text-[1rem] text-gray/75 font-[400]">{ t('duration') }:</p>
                    <p className="text-[1rem] text-dark-gray font-bold">{ hoursInterval } { t('hours') }</p>
                </div>

                <div className="flex gap-[0.5rem] mt-[1rem]">
                    <p className="text-[1rem] text-gray/75 font-[400]">{ t('amenities') }:</p>
                    <div className="flex flex-col gap-[0.5rem]">
                        {
                            amenities.wifi && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-wifi-disabled.svg" alt="wifi" draggable={false} className="size-[1rem]" />
                                <p>{ t('wifi') }</p>
                            </div>
                        }
                        {
                            amenities.wc && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-wc-disabled.svg" alt="wc" draggable={false} className="size-[1rem]" />
                                <p>{ t('wc') }</p>
                            </div>
                        }
                        {
                            amenities.ac && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-ac-disabled.svg" alt="ac" draggable={false} className="size-[1rem]" />
                                <p>{ t('ac') }</p>
                            </div>
                        }
                        {
                            amenities.socket && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-socket-disabled.svg" alt="socket" draggable={false} className="size-[1rem]" />
                                <p>{ t('socket') }</p>
                            </div>
                        }
                        {
                            amenities.minibar && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-minibar-disabled.svg" alt="minibar" draggable={false} className="size-[1rem]" />
                                <p>{ t('minibar') }</p>
                            </div>
                        }
                        {
                            amenities.multimedia && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-multimedia-disabled.svg" alt="multimedia" draggable={false} className="size-[1rem]" />
                                <p>{ t('multimedia') }</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    </motion.div>
  )
}

export default RoutesContainerInfo