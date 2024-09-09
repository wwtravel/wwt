'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { TravelArray } from '../AdminRoutesContent';
import PulseLoader from 'react-spinners/PulseLoader';
import TravelCard from './TravelCard';
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText';
import RoutePatchModal from './RouteModal/RoutePatchModal';

interface RoutesContainerProps{
  loading: boolean;
  travels: TravelArray;
  fetchTravels: () => Promise<void>;
  setAlteredTravels: React.Dispatch<React.SetStateAction<TravelArray>>
}

const RoutesContainer: React.FC<RoutesContainerProps> = ({ loading, travels, fetchTravels, setAlteredTravels }) => {

  const t = useTranslations("AdminRoutes")

  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className='max-w-[66rem] w-full'>
      <div className='flex justify-between items-center'>
        <p className='font-bold xl:text-[1.125rem] text-[1.5rem] text-dark-gray mb-[0.5rem]'>{ t('routes') }</p>
        <div className='flex items-center gap-[0.5rem]' onClick={() => setIsOpen(true)}>
          <img src="/icons/route-card-icons/icon-add.svg" alt="add" draggable={false} className='lg:size-[1.125rem] size-[1.5rem]' />
          <UnderlinedText text={ t('add') }/>
        </div>

        <RoutePatchModal reservedSeats={0} fetchTravels={fetchTravels} travel={null} modalGoal="add" isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>

        {
          loading
          ? (
            <div className='h-[9.5rem] rounded-[1rem] w-full grid place-content-center bg-light-white border border-gray/25 shadow-custom'>
              <div>
                <PulseLoader 
                    size={15}
                    color='#757678'
                    style={{
                        opacity: '25%'
                    }}
                />
              </div>
          </div>
          )
          : (
            <>
              {
                travels.length === 0
                ? (
                  <div className='py-[2rem] px-[1.5rem] rounded-[1rem] w-full flex items-center justify-center bg-red/20 border border-gray/25 shadow-custom'>
                      <div className='flex lg:gap-[0.25rem] gap-[0.333rem] text-left'>
                          <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='lg:size-[1rem] size-[1.333rem] mt-[0.25rem]' />
                          <p className='text-left text-dark-gray font-open-sans lg:text-[1rem] text-[1.333rem]'>{ t('price-not-found-error') }</p>
                      </div>
                  </div>
                )
                : (
                  <div className='flex flex-col gap-[1rem]'>
                    {
                      travels.map((travel, index) => (
                        <TravelCard
                          key={travel.id}
                          travel={travel}
                          fetchTravels={fetchTravels}
                          setAlteredTravels={setAlteredTravels}
                        />
                      ))
                    }
                  </div>
                )
              }
            </>
          )
        }
    </div>
  )
}

export default RoutesContainer