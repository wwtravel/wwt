'use client'

import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import useStore from '@/hooks/useStore'

interface DestinationPriceProps{
    price: number;
}

const DestinationPrice:React.FC<DestinationPriceProps> = ({ price }) => {
  return (
    <div className="absolute py-[0.75rem] px-[1rem] bg-red rounded-[0.5rem] font-montserrat font-bold text-[1.5rem] text-white">
        { price }
    </div>
  )
}

export default DestinationPrice