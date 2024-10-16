import { useTranslations } from 'next-intl'
import React from 'react'
import FilterDatePicker from './FilterDatePicker'
import { Checkbox } from '@/components/ui/checkbox'
import FilterSelect from './FilterSelect'
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText'
import { CheckedState } from '@radix-ui/react-checkbox'

interface FIlterProps{
    sortContition: "resAsc" | "resDesc" | "newest" | "oldest" | "none";
    setSortContition: React.Dispatch<React.SetStateAction<"resAsc" | "resDesc" | "newest" | "oldest" | "none">>;
    outputContition: "all" | "tour" | "retour";
    setOutputCondition: React.Dispatch<React.SetStateAction<"all" | "tour" | "retour">>;
    dateCondition: string;
    setDateCondition: React.Dispatch<React.SetStateAction<string>>;
    handleClick: () => void;
    handleReset: () => void;
}

const Filter:React.FC<FIlterProps> = ({ sortContition, setSortContition, outputContition, setOutputCondition, dateCondition, setDateCondition, handleClick, handleReset }) => {

  const t = useTranslations("AdminRoutes")

  const handleCheck = (e: CheckedState, value: "all" | "tour" | "retour") => {
    if (e) {
        setOutputCondition(value)
    }
  }

  return (
    <div className='mxl:max-w-[22rem] max-w-[25rem] w-full font-open-sans'>
        <p className='font-bold xl:text-[1.125rem] text-[1.5rem] text-dark-gray mb-[0.5rem]'>{ t('filter-by') }</p>

        <div className='w-full p-[1.5rem] bg-light-white border border-gray/25 rounded-[1rem] shadow-sm'>
            <p className='xl:text-[1.125rem] text-[1.5rem] text-dark-gray font-[400] mb-[0.5rem]'>{ t('route-date') }:</p>
            <FilterDatePicker dateCondition={dateCondition} setDateCondition={setDateCondition}/>
            <p className='xl:text-[1.125rem] text-[1.5rem] text-dark-gray font-[400] mb-[0.5rem] mt-[1.5rem]'>{ t('route-output') }:</p>

            <div className='flex flex-col gap-[0.5rem]'>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='allRoutes' checked={ outputContition === 'all' } onCheckedChange={(e) => handleCheck(e, "all")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="allRoutes">{ t('all-routes') }</label>
                </div>
                <div className='flex items-start gap-[0.5rem] select-none'>
                    <Checkbox className='mt-[0.25rem]' id='tour' checked={ outputContition === 'tour' } onCheckedChange={(e) => handleCheck(e, "tour")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="tour">{ t('tour') }</label>
                </div>
                <div className='flex items-start gap-[0.5rem] select-none'>
                    <Checkbox className='mt-[0.25rem]' id='return' checked={ outputContition === 'retour' } onCheckedChange={(e) => handleCheck(e, "retour")}/>
                    <label className='text-gray xl:text-[1rem] text-[1.333rem] font-[400]' htmlFor="return">{ t('return') }</label>
                </div>
            </div>

            <p className='xl:text-[1.125rem] text-[1.5rem] text-dark-gray font-[400] mb-[0.5rem] mt-[1.5rem]'>{ t('sort-by') }:</p>
            <FilterSelect sortContition={sortContition} setSortContition={setSortContition}/>

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

export default Filter