'use client'

import { SelectedRoutes } from '@/app/[locale]/route-search/PageContent'
import { Travel } from '@/types/routeType';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import RouteDetails from './RouteDetails';
import PassengersDataContainer from './PassengersDataContainer';

import { useSession } from 'next-auth/react';
import SignInQuestionBox from './SignInQuestionBox';
import AutoFillFields from './AutoFillFields';

export interface Passenger{
  firstname: string;
  lastname: string;
  price: number;
}

interface ContactDetails{
  phone: string;
  email: string;
}

interface OrderData {
  travel_id: string;
  passengers: Passenger[];
  user_id: string;
  contact_details: ContactDetails;
  lang: string;
}

interface CheckoutProps{
  seletcedDepartureRoute : Travel;
  seletcedArrivalRoute : Travel | null;
  setSelectedRoutes: React.Dispatch<React.SetStateAction<SelectedRoutes>>
}

const Checkout:React.FC<CheckoutProps> = ({ setSelectedRoutes, seletcedDepartureRoute, seletcedArrivalRoute }) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  const t = useTranslations("RouteSearchPage_Checkout")

  const locale = useLocale()

  const getLocale = (locale: string) => {
    switch(locale){
      case 'en' : return 'en'
      case 'ro' : return 'ro'
      case 'ru' : return 'ru'
      case 'fr' : return 'fr'
      default : return 'en'
    }
  }

  const [tourCost, setTourCost] = useState(0)
  const [returnCost, setReturnCost] = useState(0)

  const { data } = useSession()

  const [checkoutContent, setCheckoutContent] = useState<"tour" | "return">('tour')

  const [tourPassengers, setTourPassengers] = useState<Passenger[]>([
    {
        firstname: '',
        lastname: '',
        price: 0
    }
  ])

  const [returnPassengers, setReturnPassengers] = useState<Passenger[]>([
    {
        firstname: '',
        lastname: '',
        price: 0
    }
  ])

  console.log(tourPassengers, returnPassengers)

  const updateTourPassenger = (index: number, updatedPassenger: Passenger) => {
    setTourPassengers(prevPassengers => 
        prevPassengers.map((passenger, i) => 
            i === index ? updatedPassenger : passenger
        )
    );
  }

  const updateReturnPassenger = (index: number, updatedPassenger: Passenger) => {
    setReturnPassengers(prevPassengers => 
        prevPassengers.map((passenger, i) => 
            i === index ? updatedPassenger : passenger
        )
    );
  }

  return (
    <div className='md:pt-[13.125rem] pt-[15rem] px-[1rem]'>
        <h1 className='text-center font-montserrat font-bold md:text-[2.5rem] text-[2rem] uppercase'>
            { checkoutContent === 'tour' ? t('title-tour') : t('title-tour') }
        </h1>
        <div className='h-[4px] w-[6rem] mx-auto mt-[1.5rem] bg-red'/>

        <div className='mt-[3rem] flex md:flex-row flex-col-reverse max-md:items-center gap-[4rem] justify-center'>
          <div className='md:max-w-[22.375rem] max-w-[29.833rem] w-full'>
            <p className='md:text-[1.125rem] text-[1.5rem] text-dark-gray font-bold font-open-sans'>{ t('order-details') }</p>
            <div className='flex flex-col gap-[1rem]'>
              <RouteDetails setSelectedRoutes={setSelectedRoutes} route={seletcedDepartureRoute} routeType='departure'/>
              {
                seletcedArrivalRoute && <RouteDetails setSelectedRoutes={setSelectedRoutes} route={seletcedArrivalRoute} routeType='return'/>
              }
              <div className='md:h-[3.5rem] h-[4.667rem] w-full bg-red grid place-content-center md:rounded-[0.5rem] rounded-[0.667rem] max-md:mt-[0.333rem]'>
                <p className='font-bold text-light-white md:text-[1.125rem] text-[1.5rem] font-open-sans'>{ t('total-price') }: {checkoutContent === 'tour' ? tourCost : returnCost}EUR</p>
              </div>
            </div>
          </div>
          
          <div className='min-h-full flex flex-col gap-[1.5rem]'>
            {
              !data && checkoutContent !== 'return' && (
                <SignInQuestionBox />
              )
            }

            {
              checkoutContent === 'return' && (
                <AutoFillFields onClick={() => setReturnPassengers(tourPassengers.map(passenger => ({...passenger})))} />
              )
            }

            {
              checkoutContent === 'tour' 
              ? (
                <div className='flex items-center gap-[0.5rem]'>
                  <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1.125rem]' />
                  <p className='font-bold text-[1.125rem] font-open-sans text-dark-gray'>
                      { seletcedDepartureRoute.route.stops[0].label[getLocale(locale)] } - &nbsp;
                      { seletcedDepartureRoute.route.stops[seletcedDepartureRoute.route.stops.length - 1].label[getLocale(locale)] }
                  </p>
                </div>
              ) 
              : (
                <div className='flex items-center gap-[0.5rem]'>
                  <img src="/icons/route-card-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[1.125rem]' />
                  <p className='font-bold text-[1.125rem] font-open-sans text-dark-gray'>
                      { seletcedArrivalRoute?.route.stops[0].label[getLocale(locale)] } - &nbsp;
                      { seletcedArrivalRoute?.route.stops[seletcedArrivalRoute?.route.stops.length - 1].label[getLocale(locale)] }
                  </p>
                </div>
              )
            }

            <PassengersDataContainer 
              passengers={ checkoutContent === "tour" ? tourPassengers : returnPassengers } 
              setPassengers={ checkoutContent === "tour" ? setTourPassengers : setReturnPassengers } 
              updatePassenger={ checkoutContent === "tour" ? updateTourPassenger : updateReturnPassenger } 
              setCost={ checkoutContent === "tour" ? setTourCost : setReturnCost } 
              setCheckoutContent={ setCheckoutContent }
              checkoutContent={ checkoutContent }
              route={checkoutContent === "tour" ? seletcedDepartureRoute : seletcedArrivalRoute} 
              prices={seletcedDepartureRoute.price} 
            />
          </div>
        </div>

    </div>
  )
}

export default Checkout