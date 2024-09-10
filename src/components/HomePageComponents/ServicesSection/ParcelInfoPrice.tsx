'use client'

import { useCurrencyRates } from "@/hooks/useCurrencyRates";
import { useCurrencyStore } from "@/hooks/useCurrencyStore";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

export interface LuggagePrice {
  id: string;
  price: number;
}

const ParcelInfoPrice = () => {
  
  const [price, setPrice] = useState(0)
  
  async function fetchPrices() {
    try {
        const response = await fetch('/api/price');
        if (!response.ok) {
            throw new Error('Failed to fetch prices');
        }
        const data = await response.json();
        setPrice(data.luggagePrice.price)
    } catch (error) {
        console.error('Error:', error);
    }
  }
  useEffect(() => {
    fetchPrices()
  }, [])

  const currency = useStore(useCurrencyStore, (state) => state.currency)

  const { rates, loading, error } = useCurrencyRates();

  return (
    <p className='font-bold md:text-[2.5rem] text-[2rem] text-dark-gray font-open-sans leading-[0.7] whitespace-nowrap'>{ (rates && !loading && currency) ? (price * rates[currency]).toFixed(0) : price }<span className="text-[1.5rem]">{ (rates && !loading && currency) ? currency : "EUR" }</span></p>
  )
}

export default ParcelInfoPrice