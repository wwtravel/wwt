'use client'

import { useEffect, useState } from 'react'
import CountryTab from './CountryTab'
import { useTranslations } from 'next-intl'

import { passengersInfoData } from '@/constants/passengersInfoData'
import ItineraryMap from '../../SharedComponents/ItineraryMap'
import RedButton from '@/components/SharedComponents/RedButton'

import { Coordinate, passengerCountriesCoordinates } from '@/constants/coordinates'
import { useStore } from 'zustand'
import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import { useCurrencyRates } from '@/hooks/useCurrencyRates'
import { roundCurrency } from '../Destinations/DestinationPrice'

const PassengerInfo = () => {

  const currency = useStore(useCurrencyStore, (state) => state.currency)

  const { rates, loading, error } = useCurrencyRates();

  const [activeCountry, setActiveCountry] = useState<"france" | "austria" | "germany" | "switzerland">("switzerland")

  const t = useTranslations("Services")

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

  return (
    <div className='max-w-[81rem] w-full mx-auto rounded-[1rem] bg-light-white border border-[#DADBDD] overflow-hidden mt-[3rem] shadow-custom'>
        <div className='flex'>
            <CountryTab country="switzerland" activeCountry={activeCountry} setActiveCountry={setActiveCountry} text={t('servicesCountry4')} imageURL='icons/country-icons/icon-flag-switzerland.svg' shouldAddBorder={false}/>
            <CountryTab country="austria" activeCountry={activeCountry} setActiveCountry={setActiveCountry} text={t('servicesCountry2')} imageURL='icons/country-icons/icon-flag-austria.svg' shouldAddBorder={true}/>
            <CountryTab country="germany" activeCountry={activeCountry} setActiveCountry={setActiveCountry} text={t('servicesCountry3')} imageURL='icons/country-icons/icon-flag-germany.svg' shouldAddBorder={true}/>
            <CountryTab country="france" activeCountry={activeCountry} setActiveCountry={setActiveCountry} text={t('servicesCountry1')} imageURL='icons/country-icons/icon-flag-france.svg' shouldAddBorder={true}/>
        </div>
        <div className='flex lg:flex-row flex-col'>
            <div className='lg:w-[50%] w-full md:px-[4rem] md:py-[3rem] xs:p-[2rem] p-[1rem]'>
                <div className='flex items-end w-full justify-between'>
                    <div className='flex items-end'>
                        <img src="/icons/passenger-info-icons/icon-adult.svg" alt="info-icon" draggable={false} className='md:size-[4rem] size-[2.667rem] md:mr-[1.5rem] mr-[0.667rem]' />
                        <p className='whitespace-nowrap  font-bold md:text-[1.5rem] text-[1.333rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ t('passenger1Title') }</p>
                    </div>
                    <p className='whitespace-nowrap font-bold md:text-[2.5rem] xs:text-[2rem] text-[1.5rem] text-dark-gray font-open-sans leading-[0.7] '>{ (rates && currency && !loading) ? roundCurrency(passengersInfoData[activeCountry].adultFee * rates[currency], currency) : passengersInfoData[activeCountry].adultFee }<span className='uppercase xs:text-[1.5rem] text-[1.125rem] '>{(rates && currency && !loading) ? currency : "EUR"}</span></p>
                </div>

                <div className='flex items-end w-full mt-[1.5rem] justify-between'>
                    <div className='flex items-end'>
                        <img src="/icons/passenger-info-icons/icon-child.svg" alt="info-icon" draggable={false} className='md:size-[4rem] size-[2.667rem] md:mr-[1.5rem] mr-[0.667rem]' />
                        <p className='whitespace-nowrap font-bold md:text-[1.5rem] text-[1.333rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ t('passenger2Title') } <span className='font-[400]'>- { t('passenger2info') }</span></p>
                    </div>
                    <p className='whitespace-nowrap font-bold md:text-[2.5rem] xs:text-[2rem] text-[1.5rem] text-dark-gray font-open-sans leading-[0.7] '>{ (rates && currency && !loading) ? roundCurrency(passengersInfoData[activeCountry].childFee * rates[currency], currency) : passengersInfoData[activeCountry].childFee }<span className='uppercase xs:text-[1.5rem] text-[1.125rem] '>{(rates && currency && !loading) ? currency : "EUR"}</span></p>
                </div>

                <div className='flex items-end w-full mt-[1.5rem] justify-between'>
                    <div className='flex items-end'>
                        <img src="/icons/passenger-info-icons/icon-student.svg" alt="info-icon" draggable={false} className='md:size-[4rem] size-[2.667rem] md:mr-[1.5rem] mr-[0.667rem]' />
                        <p className='whitespace-nowrap  font-bold md:text-[1.5rem] text-[1.333rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ t('passenger3Title') } <span className='font-[400]'>- { t('passenger3info') }</span></p>
                    </div>
                    <p className='whitespace-nowrap font-bold md:text-[2.5rem] xs:text-[2rem] text-[1.5rem] text-dark-gray font-open-sans leading-[0.7]'>{ (rates && currency && !loading) ? roundCurrency(passengersInfoData[activeCountry].studentFee * rates[currency], currency) : passengersInfoData[activeCountry].studentFee }<span className='uppercase xs:text-[1.5rem] text-[1.125rem] '>{(rates && currency && !loading) ? currency : "EUR"}</span></p>
                </div>

                <div className='flex items-end w-full mt-[1.5rem] justify-between'>
                    <div className='flex items-end'>
                        <img src="/icons/passenger-info-icons/icon-luggage.svg" alt="info-icon" draggable={false} className='md:size-[4rem] size-[2.667rem] md:mr-[1.5rem] mr-[0.667rem]' />
                        <p className='whitespace-nowrap  font-bold md:text-[1.5rem] text-[1.333rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ t('passenger4Title') } <span className='font-[400]'>- { t('passenger4info') }</span></p>
                    </div>
                    <p className='whitespace-nowrap font-bold md:text-[2.5rem] xs:text-[2rem] text-[1.5rem] text-dark-gray font-open-sans leading-[0.7]'>{ passengersInfoData[activeCountry].luggageFee === 0 ? t('free') : passengersInfoData[activeCountry].luggageFee }</p>
                </div>

                <div className='mt-[3rem]'>
                    <RedButton text={ t('bookBtnText') }/>
                </div>
                

            </div>

            <div className='lg:w-[50%] max-lg:w-full max-lg:h-[26rem]'>
                {
                    activeCountry === 'austria' && <ItineraryMap coordinates={passengerCountriesCoordinates.au} center={[getMidpoint(passengerCountriesCoordinates.au).latitude, getMidpoint(passengerCountriesCoordinates.au).longitude]}/>
                }
                {
                    activeCountry === 'france' && <ItineraryMap coordinates={passengerCountriesCoordinates.fr} center={[getMidpoint(passengerCountriesCoordinates.fr).latitude, getMidpoint(passengerCountriesCoordinates.fr).longitude]}/>
                }
                {
                    activeCountry === 'germany' && <ItineraryMap coordinates={passengerCountriesCoordinates.gr} center={[getMidpoint(passengerCountriesCoordinates.gr).latitude, getMidpoint(passengerCountriesCoordinates.gr).longitude]}/>
                }
                {
                    activeCountry === 'switzerland' && <ItineraryMap coordinates={passengerCountriesCoordinates.sw} center={[getMidpoint(passengerCountriesCoordinates.sw).latitude, getMidpoint(passengerCountriesCoordinates.sw).longitude]}/>
                }
            </div>
        </div>
    </div>
  )
}

export default PassengerInfo