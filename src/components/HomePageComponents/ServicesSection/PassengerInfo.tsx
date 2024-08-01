'use client'

import { useState } from 'react'
import CountryTab from './CountryTab'
import { useTranslations } from 'next-intl'

import { passengersInfoData } from '@/constants/passengersInfoData'
import ItineraryMap from '../../SharedComponents/ItineraryMap'
import RedButton from '@/components/SharedComponents/RedButton'

import { passengerCoordinates } from '@/constants/coordinates'

const PassengerInfo = () => {

  const [activeCountry, setActiveCountry] = useState<"france" | "austria" | "germany" | "switzerland">("france")

  const t = useTranslations("Services")

  return (
    <div className='w-full rounded-[1rem] bg-light-white border border-[#DADBDD] overflow-hidden mt-[3rem]'>
        <div className='flex'>
            <CountryTab country="france" activeCountry={activeCountry} setActiveCountry={setActiveCountry} text={t('servicesCountry1')} imageURL='icons/country-icons/icon-flag-france.svg' shouldAddBorder={true}/>
            <CountryTab country="austria" activeCountry={activeCountry} setActiveCountry={setActiveCountry} text={t('servicesCountry2')} imageURL='icons/country-icons/icon-flag-austria.svg' shouldAddBorder={true}/>
            <CountryTab country="germany" activeCountry={activeCountry} setActiveCountry={setActiveCountry} text={t('servicesCountry3')} imageURL='icons/country-icons/icon-flag-germany.svg' shouldAddBorder={true}/>
            <CountryTab country="switzerland" activeCountry={activeCountry} setActiveCountry={setActiveCountry} text={t('servicesCountry4')} imageURL='icons/country-icons/icon-flag-switzerland.svg' shouldAddBorder={false}/>
        </div>
        <div className='flex'>
            <div className='w-[50%] px-[4rem] py-[3rem]'>
                <div className='flex items-end w-full'>
                    <img src="/icons/passenger-info-icons/icon-adult.svg" alt="info-icon" draggable={false} className='size-[4rem] mr-[1.5rem]' />
                    <p className='whitespace-nowrap  font-bold text-[1.5rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ t('passenger1Title') }</p>
                    <span className='w-full overflow-hidden whitespace-nowrap text-ellipsis leading-[0.8] text-[1.5rem]'>.......................................................................................................................................................................................................</span>
                    <p className='whitespace-nowrap font-bold text-[2.5rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ passengersInfoData[activeCountry].adultFee }€</p>
                </div>

                <div className='flex items-end w-full mt-[1.5rem]'>
                    <img src="/icons/passenger-info-icons/icon-child.svg" alt="info-icon" draggable={false} className='size-[4rem] mr-[1.5rem]' />
                    <p className='whitespace-nowrap font-bold text-[1.5rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ t('passenger2Title') } <span className='font-[400]'>- { t('passenger2info') }</span></p>
                    <span className='w-full overflow-hidden whitespace-nowrap text-ellipsis leading-[0.8] text-[1.5rem]'>.......................................................................................................................................................................................................</span>
                    <p className='whitespace-nowrap font-bold text-[2.5rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ passengersInfoData[activeCountry].childFee }€</p>
                </div>

                <div className='flex items-end w-full mt-[1.5rem]'>
                    <img src="/icons/passenger-info-icons/icon-student.svg" alt="info-icon" draggable={false} className='size-[4rem] mr-[1.5rem]' />
                    <p className='whitespace-nowrap  font-bold text-[1.5rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ t('passenger3Title') } <span className='font-[400]'>- { t('passenger3info') }</span></p>
                    <span className='w-full overflow-hidden whitespace-nowrap text-ellipsis leading-[0.8] text-[1.5rem] mr-[0.5rem]'>.......................................................................................................................................................................................................</span>
                    <p className='whitespace-nowrap font-bold text-[2.5rem] text-dark-gray font-open-sans leading-[0.7]'>{ passengersInfoData[activeCountry].studentFee }€</p>
                </div>

                <div className='flex items-end w-full mt-[1.5rem]'>
                    <img src="/icons/passenger-info-icons/icon-luggage.svg" alt="info-icon" draggable={false} className='size-[4rem] mr-[1.5rem]' />
                    <p className='whitespace-nowrap  font-bold text-[1.5rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ t('passenger4Title') } <span className='font-[400]'>- { t('passenger4info') }</span></p>
                    <span className='w-full overflow-hidden whitespace-nowrap text-ellipsis leading-[0.8] text-[1.5rem] mr-[0.5rem]'>.......................................................................................................................................................................................................</span>
                    <p className='whitespace-nowrap font-bold text-[2.5rem] text-dark-gray font-open-sans leading-[0.7]'>{ passengersInfoData[activeCountry].luggageFee === 0 ? t('free') : passengersInfoData[activeCountry].luggageFee }</p>
                </div>

                <div className='mt-[3rem]'>
                    <RedButton text={ t('bookBtnText') }/>
                </div>
                

            </div>

            <div className='w-[50%]'>
                <ItineraryMap coordinates={passengerCoordinates} center={[passengerCoordinates[0].latitude, passengerCoordinates[0].longitude]}/>
            </div>
        </div>
    </div>
  )
}

export default PassengerInfo