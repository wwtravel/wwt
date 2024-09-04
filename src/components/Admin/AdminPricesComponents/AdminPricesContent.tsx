'use client'

import React, { useEffect, useState } from 'react'
import PricesFilter from './PricesFilter/PricesFilter'
import PricesContainer from './PricesContainer/PricesContainer'

interface PriceSheet {
  adult: number;
  child: number;
  student: number;
}

export interface Price {
  id: string;
  from: string;
  to: string;
  price_sheet: PriceSheet;
}

export type PricesArray = Price[];

const AdminPricesContent = () => {

  const [loading, setLoading] = useState(false)
  const [prices, setPrices] = useState<PricesArray>([])
  const [alteredPrices, setAlteredPrices] = useState<PricesArray>([])

  async function fetchPrices() {
    setLoading(true)
    try {
        const response = await fetch('/api/price');
        if (!response.ok) {
            setLoading(false)
            throw new Error('Failed to fetch prices');
        }
        const data = await response.json();
        setPrices(data)
        setAlteredPrices(data)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchPrices()
  }, [])

  //array altering

  const sortByAdultPriceAsc = (prices: Price[]): Price[] => {
    return prices.sort((a, b) => a.price_sheet.adult - b.price_sheet.adult);
  };

  const sortByAdultPriceDesc = (prices: Price[]): Price[] => {
    return prices.sort((a, b) => b.price_sheet.adult - a.price_sheet.adult);
  };

  const filterByCities = (prices: Price[], fromCity: string, toCity: string): Price[] => {
    return prices.filter(price => price.from === fromCity && price.to === toCity);
  };

  const handleClick = () => {
    let tempPrices = [...prices]
    console.log("Temp Prices", tempPrices)

    //output
    if(outputContition === "au-gr") tempPrices = filterByCities(prices, "austria", "germany")
    if(outputContition === "au-fr") tempPrices = filterByCities(prices, "austria", "france")
    if(outputContition === "gr-fr") tempPrices = filterByCities(prices, "germany", "france")
    if(outputContition === "md-au") tempPrices = filterByCities(prices, "moldova", "austria")
    if(outputContition === "md-fr") tempPrices = filterByCities(prices, "moldova", "france")
    if(outputContition === "md-gr") tempPrices = filterByCities(prices, "moldova", "germany")
    if(outputContition === "md-sw") tempPrices = filterByCities(prices, "moldova", "switzerland")
    if(outputContition === "parcels") tempPrices = filterByCities(prices, "parcels", "parcels")

    console.log("Temp Prices", tempPrices)
    // sorting
    if(sortContition === 'priceAsc') tempPrices = sortByAdultPriceAsc(prices)
    if(sortContition === 'priceDesc') tempPrices = sortByAdultPriceDesc(prices)
    if(sortContition === 'none') tempPrices = prices

    console.log("Temp Prices", tempPrices)
    setAlteredPrices(prev => [...tempPrices])
    console.log("Altered Prices", alteredPrices)
  }


  const [sortContition, setSortContition] = useState<"priceAsc" | "priceDesc" | "none">("none")
  const [outputContition, setOutputCondition] = useState<"all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr" | "parcels">("all")

  return (
    <div className='pt-[9.5rem] flex xl:gap-[4rem] gap-[2rem] justify-center mb-[5rem]'>
        <PricesFilter handleClick={handleClick} sortContition={sortContition} setSortContition={setSortContition} setOutputCondition={setOutputCondition} outputContition={outputContition}/>
        <PricesContainer loading={loading} prices={alteredPrices}/>
    </div>
  )
}

export default AdminPricesContent