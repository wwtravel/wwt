import { SelectedRoutes } from '@/app/[locale]/route-search/PageContent'
import { Travel } from '@/types/routeType';
import { useTranslations } from 'next-intl';
import React from 'react'
import RouteDetails from './RouteDetails';
import PassengersDataContainer from './PassengersDataContainer';

interface CheckoutProps{
  seletcedDepartureRoute : Travel;
  seletcedArrivalRoute : Travel | null;
  setSelectedRoutes: React.Dispatch<React.SetStateAction<SelectedRoutes>>
}

const Checkout:React.FC<CheckoutProps> = ({ setSelectedRoutes, seletcedDepartureRoute, seletcedArrivalRoute }) => {

  const t = useTranslations("RouteSearchPage_Checkout")

  return (
    <div className='md:pt-[13.125rem] pt-[15rem] px-[1rem]'>
        <h1 className='text-center font-montserrat font-bold md:text-[2.5rem] text-[2rem] uppercase'>
            { t('title') }
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
                <p className='font-bold text-light-white md:text-[1.125rem] text-[1.5rem] font-open-sans'>{ t('total-price') }: 300EUR</p>
              </div>
            </div>
          </div>

          <PassengersDataContainer prices={seletcedDepartureRoute.price} />
        </div>

    </div>
  )
}

export default Checkout