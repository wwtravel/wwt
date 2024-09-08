import React, { useState } from 'react'
import { useTranslations } from 'next-intl';
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText';
import PricePatchModal from '../PricePatchModal';
import { LuggagePrice, Price } from '../AdminPricesContent';
import LuggagePatchModal from './LuggagePatchModal';

interface LuggagePriceCardProps{
    price : LuggagePrice;
    fetchPrices(): Promise<void>
}

const LuggagePriceCard:React.FC<LuggagePriceCardProps> = ({ price, fetchPrices }) => {

    const t = useTranslations("AdminPrices")
    const prices_t = useTranslations("Services")

    const [isOpen, setIsOpen] = useState(false)

    const getCountry = ( country: string ) => {
        switch(country){
            case "moldova" : return t('md')
            case "switzerland" : return t('sw')
            case "france" : return t('fr')
            case "austria" : return t('au')
            case "germany" : return t('gr')
            default : "Country"
        }
    }

  return (
    <div className='w-full p-[1.5rem] bg-light-white rounded-[1rem] border border-gray/25 shadow-custom flex flex-col justify-between h-full'>
        <div>
            <div className='flex gap-[0.5rem] items-center'>
                <p className='text-[1.5rem] font-bold text-dark-gray'>{ t('parcels') }</p>
            </div>

            <div className="w-full mt-[1.5rem]">
                <div className="flex justify-between items-center font-open-sans text-dark-gray">
                    <div className="flex items-center">
                        <img src="/icons/passenger-info-icons/icon-weight.svg" alt="bag" draggable={false} className="xl:size-[1rem] size-[1.333rem] xl:mr-[0.25rem] mr-[0.333rem]" />
                        <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ t('parcels-bold') } - <span className="font-[400]">{ t('one-kg') }</span></p>
                    </div>
                    <p className="font-bold xl:text-[1.5rem] text-[2rem]">
                        { price.price }
                        <span className="xl:text-[1rem] text-[1.333rem] uppercase">eur</span>
                    </p>
                </div>
                <div className="flex justify-between items-center font-open-sans text-dark-gray">
                    <div className="flex items-center">
                        <img src="/icons/passenger-info-icons/icon-luggage.svg" alt="luggage" draggable={false} className="xl:size-[1rem] size-[1.333rem] xl:mr-[0.25rem] mr-[0.333rem]" />
                        <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ t('luggage') } <span className="font-[400]">- { t('fifty-kg') }</span></p>
                    </div>
                    <p className="font-bold xl:text-[1.5rem] text-[2rem]">
                        { t('free') }
                    </p>
                </div>
            </div>
        </div>

            <div className='w-full flex justify-center items-center gap-[0.25rem] mt-[1.5rem]' onClick={() => setIsOpen(true)}>
                <img src="/icons/route-card-icons/icon-pencil.svg" alt="edit" draggable={false} className='size-[1rem]' />
                <UnderlinedText text={ t('edit-prices') }/>
            </div>

        <LuggagePatchModal fetchPrices={fetchPrices} isOpen={isOpen} setIsOpen={setIsOpen} luggagePrice={price}/>
    </div>
  )
}

export default LuggagePriceCard