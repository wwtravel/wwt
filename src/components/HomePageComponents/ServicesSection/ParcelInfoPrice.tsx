'use client'

import { useCurrencyRates } from "@/hooks/useCurrencyRates";
import { useCurrencyStore } from "@/hooks/useCurrencyStore";
import { useStore } from "zustand";
import { roundCurrency } from "../Destinations/DestinationPrice";

const ParcelInfoPrice = () => {

  const currency = useStore(useCurrencyStore, (state) => state.currency)

  const { rates, loading, error } = useCurrencyRates();

  return (
    <p className='font-bold md:text-[2.5rem] text-[2rem] text-dark-gray font-open-sans leading-[0.7] whitespace-nowrap'>{ (rates && !loading && currency) ? (2 * rates[currency]).toFixed(0) : 2 }<span className="text-[1.5rem]">{ (rates && !loading && currency) ? currency : "EUR" }</span></p>
  )
}

export default ParcelInfoPrice