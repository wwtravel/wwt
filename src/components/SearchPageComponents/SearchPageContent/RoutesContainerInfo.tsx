'use client'

import ItineraryMap from "@/components/SharedComponents/ItineraryMap";
import { Coordinate } from "@/constants/coordinates";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface RouteStop {
    city: string;
    country: string;
    hours: number;
    is_destination: boolean;
    label: {
        en: string;
        fr: string;
        ro: string;
        ru: string;
    };
    lat: number;
    lon: number;
}

interface Prices{
    adult : number;
    child : number;
    student : number;
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
    stops: RouteStop[];
    price: Prices;
    freePlaces : number;
    hoursInterval: number;
    amenities : Amenities;
}

const RoutesContainerInfo:React.FC<RoutesContainerInfoProps> = ({ openRoutesIndexes, routeIndex, stops, price, freePlaces, hoursInterval, amenities }) => {

  const prices_t = useTranslations("Services")
  const t = useTranslations("RouteSearchPage")

  const [open, setOpen] = useState(false)

  const coords : Coordinate[] = []

  stops.forEach(stop => {
      coords.push({
          latitude: stop.lat,
          longitude: stop.lon
      })
  })

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


  useEffect(() => {
    if(openRoutesIndexes.includes(routeIndex)) setOpen(true)
        else setOpen(false)
  }, [openRoutesIndexes])


  return (
    <motion.div 
        className='w-full overflow-hidden'
        initial={{ height: 0 }}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
    >
        <div className="mt-[2rem] pt-[2rem] border-t border-gray/25 flex lg:flex-row flex-col-reverse items-start justify-between">
            <div className="flex md:flex-row flex-col-reverse lg:gap-[3rem] gap-[2rem] max-lg:justify-between lg:flex-1 max-lg:w-full">
                <div className="md:h-[16rem] h-[27rem] lg:min-w-[32rem] md:min-w-[30rem] min-w-full rounded-[0.5rem] overflow-hidden border border-gray/25 shadow-custom">
                    <ItineraryMap 
                        center={[getMidpoint(coords).latitude, getMidpoint(coords).longitude]} 
                        coordinates={coords}/>
                </div>

                <div className="lg:max-w-[18.75rem] max-w-[27rem] w-full">
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-adult.svg" alt="adult" draggable={false} className="lg:size-[1rem] size-[1.333rem] lg:mr-[0.25rem] mr-[0.333rem]" />
                                <p className="font-bold lg:text-[1rem] text-[1.333rem]">{ prices_t('passenger1Title') }</p>
                            </div>
                            <p className="font-bold lg:text-[1.5rem] text-[2rem]">
                                { price.adult }
                                <span className="lg:text-[1rem] text-[1.333rem] uppercase">eur</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-child.svg" alt="child" draggable={false} className="lg:size-[1rem] size-[1.333rem] lg:mr-[0.25rem] mr-[0.333rem]" />
                                <p className="font-bold lg:text-[1rem] text-[1.333rem]">{ prices_t('passenger2Title') } <span className="font-[400]">- { prices_t('passenger2info') }</span></p>
                            </div>
                            <p className="font-bold lg:text-[1.5rem] text-[2rem]">
                                { price.child }
                                <span className="lg:text-[1rem] text-[1.333rem] uppercase">eur</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-student.svg" alt="student" draggable={false} className="lg:size-[1rem] size-[1.333rem] lg:mr-[0.25rem] mr-[0.333rem]" />
                                <p className="font-bold lg:text-[1rem] text-[1.333rem]">{ prices_t('passenger3Title') } <span className="font-[400]">- { prices_t('passenger3info') }</span></p>
                            </div>
                            <p className="font-bold lg:text-[1.5rem] text-[2rem]">
                                { price.student }
                                <span className="lg:text-[1rem] text-[1.333rem] uppercase">eur</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center font-open-sans text-dark-gray">
                            <div className="flex items-center">
                                <img src="/icons/passenger-info-icons/icon-luggage.svg" alt="luggage" draggable={false} className="lg:size-[1rem] size-[1.333rem] lg:mr-[0.25rem] mr-[0.333rem]" />
                                <p className="font-bold lg:text-[1rem] text-[1.333rem]">{ prices_t('passenger4Title') } <span className="font-[400]">- { prices_t('passenger4info') }</span> </p>
                            </div>
                            <p className="font-bold lg:text-[1.5rem] text-[2rem]">{ prices_t('free') }</p>
                        </div>
                </div>
            </div>

            <div className="font-open-sans max-lg:mb-[2rem] flex flex-col gap-[1rem] max-lg:items-center max-lg:w-full">
                <div className="flex gap-[0.5rem] items-center">
                    <p className="lg:text-[1rem] text-[1.333rem] text-gray/75 font-[400]">{ t('free-spaces') }:</p>
                    <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" draggable={false} className="size-[1rem]" />
                    <p className="lg:text-[1rem] text-[1.333rem] text-dark-gray font-bold">{ freePlaces }</p>
                </div>

                <div className="flex gap-[0.5rem] items-center">
                    <p className="lg:text-[1rem] text-[1.333rem] text-gray/75 font-[400]">{ t('duration') }:</p>
                    <p className="lg:text-[1rem] text-[1.333rem] text-dark-gray font-bold">{ hoursInterval } { t('hours') }</p>
                </div>

                <div className="flex gap-[0.5rem]">
                    <p className="lg:text-[1rem] text-[1.333rem] text-gray/75 font-[400]">{ t('amenities') }:</p>
                    <div className="flex lg:flex-col flex-row gap-[0.5rem]">
                        {
                            amenities.wifi && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-wifi-disabled.svg" alt="wifi" draggable={false} className="lg:size-[1rem] size-[1.333rem]" />
                                <p className="max-lg:hidden">{ t('wifi') }</p>
                            </div>
                        }
                        {
                            amenities.wc && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-wc-disabled.svg" alt="wc" draggable={false} className="lg:size-[1rem] size-[1.333rem]" />
                                <p className="max-lg:hidden">{ t('wc') }</p>
                            </div>
                        }
                        {
                            amenities.ac && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-ac-disabled.svg" alt="ac" draggable={false} className="lg:size-[1rem] size-[1.333rem]" />
                                <p className="max-lg:hidden">{ t('ac') }</p>
                            </div>
                        }
                        {
                            amenities.socket && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-socket-disabled.svg" alt="socket" draggable={false} className="lg:size-[1rem] size-[1.333rem]" />
                                <p className="max-lg:hidden">{ t('socket') }</p>
                            </div>
                        }
                        {
                            amenities.minibar && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-minibar-disabled.svg" alt="minibar" draggable={false} className="lg:size-[1rem] size-[1.333rem]" />
                                <p className="max-lg:hidden">{ t('minibar') }</p>
                            </div>
                        }
                        {
                            amenities.multimedia && <div className="flex items-center gap-[0.5rem] text-[0.875rem] font-[400]">
                                <img src="/icons/destinations-icons/icon-multimedia-disabled.svg" alt="multimedia" draggable={false} className="lg:size-[1rem] size-[1.333rem]" />
                                <p className="max-lg:hidden">{ t('multimedia') }</p>
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