import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { PriceSheet } from "@/types/routeType"
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import { Passenger } from "./PassengersDataContainer";

  interface PriceSelectBoxProps{
    prices : PriceSheet;
    setPassenger: (updatedPassenger: Passenger) => void;
    passenger: Passenger;
    selectBoxErr: boolean;
  }

const PriceSelectBox:React.FC<PriceSelectBoxProps> = ({ prices, setPassenger, passenger, selectBoxErr }) => {

  const [isOpen, setIsOpen] = useState(false)

  const t = useTranslations("RouteSearchPage_Checkout")

  const handleSelectChange = (value: string) => {
    
    let updatedPrice = 0

    if(value === 'adult'){
        updatedPrice = prices.adult;
    } else if(value === 'student'){
        updatedPrice = prices.student;
    } else {
        updatedPrice = prices.child;
    }

    setPassenger({ ...passenger, price: updatedPrice });
  };

  return (
    <Select open={isOpen} onOpenChange={setIsOpen} onValueChange={handleSelectChange}>
      <SelectTrigger className={`${ selectBoxErr && 'animate-input-error' } relative font-open-sans text-[1rem] w-full lg:h-[3.5rem] h-[4.667rem] bg-light-white  md:rounded-[0.5rem] rounded-[0.667rem] border-gray/25 px-[1.5rem] py-0`}>
      <div className="pt-[1rem]">
        <SelectValue className="ring-0 text-[1rem] text-dark-gray font-open-sans font-[400]"/>
      </div>

        <motion.label
            className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
            initial={{ scale: 1, y: '-50%' }}
            animate={{
                scale: isOpen || passenger.price !== 0 ? 0.7 : 1,
                y: isOpen || passenger.price !== 0 ? '-80%' : '-50%'
            }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
        >
            { t('ticket-type') }
        </motion.label>

      </SelectTrigger>
      <SelectContent className="bg-light-white rounded-[0.5rem] border border-gray/25">
        <SelectGroup>
          <SelectItem className="text-[1rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="adult">{ t('adult') }, {prices.adult}EUR</SelectItem>
          <SelectItem className="text-[1rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="student">{ t('student') }, {prices.student}EUR</SelectItem>
          <SelectItem className="text-[1rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="child">{ t('child') } ≤ 10 { t('years') }, {prices.child}EUR</SelectItem> 
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default PriceSelectBox