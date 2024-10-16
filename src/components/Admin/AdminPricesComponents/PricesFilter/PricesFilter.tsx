import { Checkbox } from '@/components/ui/checkbox'
import { useTranslations } from 'next-intl'
import React from 'react'
import PricesFilterSelect from './PricesFilterSelect'
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText'
import { CheckedState } from '@radix-ui/react-checkbox'

interface PricesFilterProps {
    setSortContition : React.Dispatch<React.SetStateAction<"priceAsc" | "priceDesc" | "none">>
    setOutputCondition: React.Dispatch<React.SetStateAction<"all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr" | "gr-sw" | "au-sw" | "fr-sw" | "parcels">>
    outputContition: "all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr" | "gr-sw" | "au-sw" | "fr-sw" | "parcels";
    sortContition: "priceAsc" | "priceDesc" | "none";
    handleClick : () => void;
    handleReset : () => void
}

const PricesFilter:React.FC<PricesFilterProps> = ({ sortContition, setSortContition, setOutputCondition, outputContition, handleClick, handleReset }) => {

    const t = useTranslations("AdminPrices")

    const handleCheck = (e: CheckedState, value: "all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr" | "gr-sw" | "au-sw" | "fr-sw" | "parcels") => {
        if (e) {
            setOutputCondition(value)
        }
    }

  return (
    <div className='xl:max-w-[22rem] max-w-[28rem] w-full font-open-sans'>
        <p className='font-bold xl:text-[1.125rem] text-[1.5rem] text-dark-gray mb-[0.5rem]'>{ t('filter-by') }</p>

        <div className='w-full p-[1.5rem] bg-light-white border border-gray/25 rounded-[1rem] shadow-custom'>
            <p className='xl:text-[1.125rem] text-[1.5rem] text-dark-gray font-[400] mb-[0.5rem]'>{ t('display-by-route') }:</p>

            <div className='flex flex-col gap-[0.5rem]'>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='allPrices' checked={ outputContition === 'all' } value="all" onCheckedChange={(e) => handleCheck(e, "all")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="allPrices">{ t('all-prices') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='md-sw' checked={ outputContition === 'md-sw' }  onCheckedChange={(e) => handleCheck(e, "md-sw")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="md-sw">{ t('md-sw') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='md-gr' checked={ outputContition === 'md-gr' }  onCheckedChange={(e) => handleCheck(e, "md-gr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="md-gr">{ t('md-gr') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='md-fr' checked={ outputContition === 'md-fr' }  onCheckedChange={(e) => handleCheck(e, "md-fr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="md-fr">{ t('md-fr') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='md-au' checked={ outputContition === 'md-au' }  onCheckedChange={(e) => handleCheck(e, "md-au")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="md-au">{ t('md-au') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='au-gr' checked={ outputContition === 'au-gr' }  onCheckedChange={(e) => handleCheck(e, "au-gr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="au-gr">{ t('au-gr') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='fr-au' checked={ outputContition === 'au-fr' }  onCheckedChange={(e) => handleCheck(e, "au-fr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="au-fr">{ t('fr-au') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='gr-fr' checked={ outputContition === 'gr-fr' }  onCheckedChange={(e) => handleCheck(e, "gr-fr")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="gr-fr">{ t('gr-fr') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='gr-sw' checked={ outputContition === 'gr-sw' }  onCheckedChange={(e) => handleCheck(e, "gr-sw")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="gr-sw">{ t('gr-sw') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='au-sw' checked={ outputContition === 'au-sw' }  onCheckedChange={(e) => handleCheck(e, "au-sw")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="au-sw">{ t('au-sw') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='fr-sw' checked={ outputContition === 'fr-sw' }  onCheckedChange={(e) => handleCheck(e, "fr-sw")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="fr-sw">{ t('fr-sw') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='parcels' checked={ outputContition === 'parcels' }  onCheckedChange={(e) => handleCheck(e, "parcels")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="parcels">{ t('parcels') }</label>
                </div>
            </div>

            <p className='xl:text-[1.125rem] text-[1.5rem] text-dark-gray font-[400] mb-[0.5rem] mt-[1.5rem]'>{ t('sort-by') }:</p>

            <PricesFilterSelect setSortContition={setSortContition} sortContition={sortContition} />

            <div className='flex justify-between items-center mt-[3rem]'>
                <div onClick={handleReset}>
                    <UnderlinedText text={ t('delete') }/>
                </div>

                <button className='bg-red hover:bg-dark-red transition-colors duration-300 grid place-content-center rounded-[0.5rem] xl:h-[2.5rem] h-[3rem] px-[1.5rem]' onClick={handleClick}>
                    <p className='text-light-white xl:text-[1rem] text-[1.333rem] font-bold'>{ t('filter') }</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default PricesFilter