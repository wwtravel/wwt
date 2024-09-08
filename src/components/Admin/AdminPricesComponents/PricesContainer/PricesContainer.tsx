'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader';
import PriceCard from './PriceCard';
import { LuggagePrice, PricesArray } from '../AdminPricesContent';
import LuggagePriceCard from './LuggagePriceCard';

interface PricesContainerProps{
  prices : PricesArray;
  loading: boolean;
  fetchPrices(): Promise<void>;
  luggagePrice : LuggagePrice | undefined;
  showLuggage: boolean
}


const PricesContainer:React.FC<PricesContainerProps> = ({ prices, loading, fetchPrices, luggagePrice, showLuggage }) => {

  const t = useTranslations("AdminPrices")

  return (
    <div className='max-w-[69rem] w-full font-open-sans'>
        <p className='xl:text-[1.125rem] text-[1.5rem] font-bold text-dark-gray mb-[0.5rem]'>{ t('prices') }</p>

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
                prices.length === 0 && !showLuggage
                ? (
                  <div className='py-[2rem] px-[1.5rem] rounded-[1rem] w-full flex items-center justify-center bg-red/20 border border-gray/25 shadow-custom'>
                      <div className='flex lg:gap-[0.25rem] gap-[0.333rem] text-left'>
                          <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='lg:size-[1rem] size-[1.333rem] mt-[0.25rem]' />
                          <p className='text-left text-dark-gray font-open-sans lg:text-[1rem] text-[1.333rem]'>{ t('price-not-found-error') }</p>
                      </div>
                  </div>
                )
                : (
                  <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 grid-flow-row gap-[1rem] '>
                    {
                      prices.map((price, index) => (
                        <PriceCard fetchPrices={fetchPrices} key={index} price={price}/>
                      ))
                    }
                    {
                      luggagePrice && showLuggage && (
                        <LuggagePriceCard price={luggagePrice} fetchPrices={fetchPrices}/>
                      )
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

export default PricesContainer