import ModalWindow from '@/components/SharedComponents/ModalWindow'
import React, { useEffect, useState } from 'react'
import { Price, PriceSheet } from './AdminPricesContent';
import { useTranslations } from 'next-intl';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'sonner';

interface PricePatchModalProps{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    price: Price;
    fetchPrices(): Promise<void>
}

const PricePatchModal:React.FC<PricePatchModalProps> = ({ isOpen, setIsOpen, price, fetchPrices }) => {

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

    const [priceData, setPriceData] = useState<PriceSheet>(price.price_sheet)

    useEffect(() => {
        if(!isOpen){
            setPriceData(price.price_sheet)
        }
    }, [isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numericValue = Math.min(Number(value), 1000);

        setPriceData((prev) => ({
          ...prev,
          [name]: numericValue,
        }));
      };

      //fetch

      const [loading, setLoading] = useState(false)

      async function updatePrice(priceData: { id: string; from: string; to: string; price_sheet: PriceSheet }) {
        setLoading(true)
        try {
            const response = await fetch('/api/price', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(priceData),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setLoading(false)
                toast( t('price-err-title'), {
                    description: t('price-err-desc'),
                    action: {
                      label: t('close'),
                      onClick: () => {}
                    }
                  })
                console.error('Error updating price:', data.msg);
                throw new Error(data.msg);
            }

            setLoading(false)
            fetchPrices()
            return data;
        } catch (error) {
            console.error('An error occurred:', error);
            setLoading(false)
            toast( t('price-err-title'), {
                description: t('price-err-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
            throw error;
        }
    }

    const handleUpdate = () => {
        updatePrice({
            id: price.id,
            from: price.from,
            to: price.to,
            price_sheet: priceData
        })
    }


  return (
    <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={28.75}>
        <div className='px-[3rem] pb-[3rem] pt-[4rem] relative'>
            <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>

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
                    <div className='flex gap-[0.25rem] items-end'>
                        <input min={0} name='adult' className='w-[4rem] h-[2rem] text-[1rem] font-open-sans text-dark-gray border border-gray/25 text-center outline-none rounded-[0.25rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" value={priceData.adult } onChange={handleChange} />
                        <span className="xl:text-[1rem] text-[1.333rem] uppercase font-bold ">eur</span>
                    </div>
                </div>
                <div className="flex justify-between items-center font-open-sans text-dark-gray mt-[1rem]">
                    <div className="flex items-center">
                        <img src="/icons/passenger-info-icons/icon-child.svg" alt="child" draggable={false} className="xl:size-[1rem] size-[1.333rem] xl:mr-[0.25rem] mr-[0.333rem]" />
                        <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ prices_t('passenger2Title') } <span className="font-[400]">- { prices_t('passenger2info') }</span></p>
                    </div>
                    <div className='flex gap-[0.25rem] items-end'>
                        <input min={0} name='student' className='w-[4rem] h-[2rem] text-[1rem] font-open-sans text-dark-gray border border-gray/25 text-center outline-none rounded-[0.25rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" value={priceData.student } onChange={handleChange} />
                        <span className="xl:text-[1rem] text-[1.333rem] uppercase font-bold ">eur</span>
                    </div>
                </div>
                <div className="flex justify-between items-center font-open-sans text-dark-gray mt-[1rem]">
                    <div className="flex items-center">
                        <img src="/icons/passenger-info-icons/icon-student.svg" alt="student" draggable={false} className="xl:size-[1rem] size-[1.333rem] xl:mr-[0.25rem] mr-[0.333rem]" />
                        <p className="font-bold xl:text-[1rem] text-[1.333rem]">{ prices_t('passenger3Title') } <span className="font-[400]">- { prices_t('passenger3info') }</span></p>
                    </div>
                    <div className='flex gap-[0.25rem] items-end'>
                        <input min={0} name='child' className='w-[4rem] h-[2rem] text-[1rem] font-open-sans text-dark-gray border border-gray/25 text-center outline-none rounded-[0.25rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" value={priceData.child } onChange={handleChange} />
                        <span className="xl:text-[1rem] text-[1.333rem] uppercase font-bold ">eur</span>
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <button className='relative mt-[2rem] bg-red hover:bg-dark-red transition-colors duration-300 h-[3.5rem] px-[1.5rem] rounded-[0.5rem] flex items-center justify-center gap-[0.5rem]' onClick={handleUpdate}>
                    <div className={`absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] ${ loading ? 'opacity-100' : 'opacity-0' }`}>
                        <PulseLoader 
                            size={5}
                            color="#FCFEFF"
                        />
                    </div>

                    <img src="/icons/route-card-icons/icon-checkmark.svg" alt="checkmark" draggable={false} className={`size-[1.5rem] ${ loading ? 'opacity-0' : 'opacity-100' }`} />
                    <p className={`font-bold text-[1.125rem] text-light-white ${ loading ? 'opacity-0' : 'opacity-100' }`}>{ t('edit-prices') }</p>
                </button>
            </div>
        </div>
    </ModalWindow>
  )
}

export default PricePatchModal