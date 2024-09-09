'use client'

import { useCurrencyRates } from '@/hooks/useCurrencyRates';
import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import useStore from '@/hooks/useStore'

export const roundCurrency = (amount: number, currency: string): number => {
  switch (currency) {
    case 'MDL':
      return Math.round(amount / 100) * 100;

    case 'CHF':
      return Math.round(amount / 10) * 10;

    case 'EUR':
    default:
      return Math.round(amount);
  }
};


interface DestinationPriceProps{
    price: number;
}

const DestinationPrice:React.FC<DestinationPriceProps> = ({ price }) => {

  const currency = useStore(useCurrencyStore, (state) => state.currency)

  const { rates, loading, error } = useCurrencyRates();


  return (
    <div className="absolute z-[100] top-[1.5rem] left-[1.5rem] py-[0.75rem] px-[1rem] bg-red rounded-[0.5rem] font-montserrat font-bold text-[1.5rem] text-white">
      <p>
        { (rates && !loading && currency) ? roundCurrency(price * rates[currency], currency) : price }
        <span className='text-[1rem]'>
          { (rates && !loading && currency) ? currency : "EUR" }
        </span>
      </p>
    </div>
  )
}

export default DestinationPrice