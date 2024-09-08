import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText';
import { Checkbox } from '@/components/ui/checkbox'
import { CheckedState } from '@radix-ui/react-checkbox';
import { useTranslations } from 'next-intl'
import React from 'react'
import OrdersDatePicker from './OrdersDatePicker';

interface OrdersFilterProps{
    setOutputCondition: React.Dispatch<React.SetStateAction<"all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr">>
    outputContition: "all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr";
    searchCondition: string;
    setSearchCondition: React.Dispatch<React.SetStateAction<string>>;
    dateCondition: string;
    setDateCondition: React.Dispatch<React.SetStateAction<string>>;
    handleClick: () => void;
}

const OrdersFilter:React.FC<OrdersFilterProps> = ({ outputContition, setOutputCondition, searchCondition, setSearchCondition, dateCondition, setDateCondition, handleClick }) => {

    const admin_prices_t = useTranslations("AdminPrices")
    const t = useTranslations("AdminOrders")

    const handleCheck = (e: CheckedState, value: "all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr") => {
        if (e) {
            setOutputCondition(value)
        }
    }

  return (
    <div className='xl:max-w-[22rem] max-w-[28rem] w-full font-open-sans'>
        <p className='font-bold xl:text-[1.125rem] text-[1.5rem] text-dark-gray mb-[0.5rem]'>{ admin_prices_t('filter-by') }</p>

        <div className='w-full p-[1.5rem] bg-light-white border border-gray/25 rounded-[1rem] shadow-custom'>

            <p className='xl:text-[1.125rem] text-[1.5rem] text-dark-gray font-[400] mb-[0.5rem]'>{ t('search-by') }:</p>
            <input type="text" value={searchCondition} onChange={(e) => setSearchCondition(e.target.value)} maxLength={50} placeholder={t('search-placeholder')} className='outline-none border bg-light-white border-gray/25 rounded-[0.5rem] w-full xl:h-[3.5rem] h-[4rem] xl:text-[1rem] text-[1.333rem] font-open-sans text-dark-gray font-[400] px-[1.5rem]' />

            <p className='xl:text-[1.125rem] text-[1.5rem] text-dark-gray font-[400] mb-[0.5rem] mt-[1.5rem]'>{ t('order-date') }:</p>
            <OrdersDatePicker dateCondition={dateCondition} setDateCondition={setDateCondition}/>

            <p className='xl:text-[1.125rem] text-[1.5rem] text-dark-gray font-[400] mb-[0.5rem] mt-[1.5rem]'>{ admin_prices_t('display-by-route') }:</p>

            <div className='flex flex-col gap-[0.5rem]'>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='allPrices' checked={ outputContition === 'all' } value="all" onCheckedChange={(e) => handleCheck(e, "all")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="allPrices">{ admin_prices_t('all-prices') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='md-sw' checked={ outputContition === 'md-sw' }  onCheckedChange={(e) => handleCheck(e, "md-sw")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="md-sw">{ admin_prices_t('md-sw') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='md-gr' checked={ outputContition === 'md-gr' }  onCheckedChange={(e) => handleCheck(e, "md-gr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="md-gr">{ admin_prices_t('md-gr') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='md-fr' checked={ outputContition === 'md-fr' }  onCheckedChange={(e) => handleCheck(e, "md-fr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="md-fr">{ admin_prices_t('md-fr') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='md-au' checked={ outputContition === 'md-au' }  onCheckedChange={(e) => handleCheck(e, "md-au")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="md-au">{ admin_prices_t('md-au') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='au-gr' checked={ outputContition === 'au-gr' }  onCheckedChange={(e) => handleCheck(e, "au-gr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="au-gr">{ admin_prices_t('au-gr') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='fr-au' checked={ outputContition === 'au-fr' }  onCheckedChange={(e) => handleCheck(e, "au-fr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="au-fr">{ admin_prices_t('fr-au') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='gr-fr' checked={ outputContition === 'gr-fr' }  onCheckedChange={(e) => handleCheck(e, "gr-fr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="gr-fr">{ admin_prices_t('gr-fr') }</label>
                </div>
            </div>

            <div className='flex justify-between items-center mt-[3rem]'>
                <div 
                    //onClick={handleReset}
                >
                    <UnderlinedText text={ admin_prices_t('delete') }/>
                </div>

                <button className='bg-red hover:bg-dark-red transition-colors duration-300 grid place-content-center rounded-[0.5rem] xl:h-[2.5rem] h-[3rem] px-[1.5rem]' 
                    onClick={handleClick}
                >
                    <p className='text-light-white xl:text-[1rem] text-[1.333rem] font-bold'>{ admin_prices_t('filter') }</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default OrdersFilter