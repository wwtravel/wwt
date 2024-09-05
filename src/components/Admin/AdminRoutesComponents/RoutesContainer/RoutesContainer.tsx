import { useTranslations } from 'next-intl'
import React from 'react'
import { TravelArray } from '../AdminRoutesContent';
import PulseLoader from 'react-spinners/PulseLoader';
import TravelCard from './TravelCard';

interface RoutesContainerProps{
  loading: boolean;
  travels: TravelArray;
}

const RoutesContainer: React.FC<RoutesContainerProps> = ({ loading, travels }) => {

  const t= useTranslations("AdminRoutes")

  return (
    <div className='max-w-[66rem] w-full'>
        <p className='font-bold text-[1.125rem] text-dark-gray mb-[0.5rem]'>{ t('routes') }</p>

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
                        <TravelCard key={index} travel={travel}/>
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