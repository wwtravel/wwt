import React, { useState } from 'react'
import { useTranslations } from 'next-intl';
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText';
import { Price } from '../AdminPricesContent';
import PricePatchModal from '../PricePatchModal';

interface PriceCardProps{
    price : Price;
    fetchPrices(): Promise<void>
}

const PriceCard: React.FC<PriceCardProps> = ({ price, fetchPrices }) => {

    const t = useTranslations("AdminPrices")
    const prices_t = useTranslations("Services")

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

    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full p-[1.5rem] bg-light-white rounded-[1rem] border border-gray/25 shadow-custom'>
        <div className='flex gap-[0.5rem] items-center'>
            <p className='text-[1.5rem] font-bold text-dark-gray'>{ getCountry(price.from) }</p>
            <img src="/icons/admin-icons/icon-reverse.svg" alt="reverse" className='size-[1rem]' />
            <p className='text-[1.5rem] font-bold text-dark-gray'>{ getCountry(price.to) }</p>
        </div>

        <div className="w-full mt-[1.5rem]">
            <div className="flex justify-between items-center font-open-sans text-dark-gray">
                <div className="flex items-center">
                    <img src="/icons/passenger-info-icons/icon-adult.svg" alt="adult" draggable={false} className="xl:size-[1rem] size-[1.333rem] xl:mr-[0.25rem] mr-[0.333rem]" />
                    <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ prices_t('passenger1Title') }</p>
                </div>
                <p className="font-bold xl:text-[1.5rem] text-[2rem]">
                    { price.price_sheet.adult }
                    <span className="xl:text-[1rem] text-[1.333rem] uppercase">eur</span>
                </p>
            </div>
            <div className="flex justify-between items-center font-open-sans text-dark-gray">
                <div className="flex items-center">
                    <img src="/icons/passenger-info-icons/icon-child.svg" alt="child" draggable={false} className="xl:size-[1rem] size-[1.333rem] xl:mr-[0.25rem] mr-[0.333rem]" />
                    <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ prices_t('passenger2Title') } <span className="font-[400]">- { prices_t('passenger2info') }</span></p>
                </div>
                <p className="font-bold xl:text-[1.5rem] text-[2rem]">
                    { price.price_sheet.student }
                    <span className="xl:text-[1rem] text-[1.333rem] uppercase">eur</span>
                </p>
            </div>
            <div className="flex justify-between items-center font-open-sans text-dark-gray">
                <div className="flex items-center">
                    <img src="/icons/passenger-info-icons/icon-student.svg" alt="student" draggable={false} className="xl:size-[1rem] size-[1.333rem] xl:mr-[0.25rem] mr-[0.333rem]" />
                    <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ prices_t('passenger3Title') } <span className="font-[400]">- { prices_t('passenger3info') }</span></p>
                </div>
                <p className="font-bold xl:text-[1.5rem] text-[2rem]">
                    { price.price_sheet.child }
                    <span className="xl:text-[1rem] text-[1.333rem] uppercase">eur</span>
                </p>
            </div>
        </div>

        <div className='w-full flex justify-center items-center gap-[0.25rem] mt-[1.5rem]' onClick={() => setIsOpen(true)}>
            <img src="/icons/route-card-icons/icon-pencil.svg" alt="edit" draggable={false} className='size-[1rem]' />
            <UnderlinedText text={ t('edit-prices') }/>
        </div>

        <PricePatchModal fetchPrices={fetchPrices} isOpen={isOpen} setIsOpen={setIsOpen} price={price}/>
    </div>
  )
}

export default PriceCard