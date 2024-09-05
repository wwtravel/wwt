'use client'

import React, { useEffect, useState } from 'react'
import PricesFilter from './PricesFilter/PricesFilter'
import PricesContainer from './PricesContainer/PricesContainer'

export interface PriceSheet {
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

  const [loading, setLoading] = useState(true)
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

    //output
    if(outputContition === "au-gr") tempPrices = filterByCities(tempPrices, "austria", "germany")
    if(outputContition === "au-fr") tempPrices = filterByCities(tempPrices, "austria", "france")
    if(outputContition === "gr-fr") tempPrices = filterByCities(tempPrices, "germany", "france")
    if(outputContition === "md-au") tempPrices = filterByCities(tempPrices, "moldova", "austria")
    if(outputContition === "md-fr") tempPrices = filterByCities(tempPrices, "moldova", "france")
    if(outputContition === "md-gr") tempPrices = filterByCities(tempPrices, "moldova", "germany")
    if(outputContition === "md-sw") tempPrices = filterByCities(tempPrices, "moldova", "switzerland")
    if(outputContition === "parcels") tempPrices = filterByCities(tempPrices, "parcels", "parcels")

    // sorting
    if(sortContition === 'priceAsc') tempPrices = sortByAdultPriceAsc(tempPrices)
    if(sortContition === 'priceDesc') tempPrices = sortByAdultPriceDesc(tempPrices)

    setAlteredPrices(tempPrices)
  }

  const handleReset = () => {
    setOutputCondition('all')
    setSortContition('none')

    setAlteredPrices(prices)
  }


  const [sortContition, setSortContition] = useState<"priceAsc" | "priceDesc" | "none">("none")
  const [outputContition, setOutputCondition] = useState<"all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr" | "parcels">("all")

  return (
    <div className='pt-[9.5rem] flex xl:gap-[4rem] gap-[2rem] justify-center mb-[5rem]'>
        <PricesFilter handleReset={handleReset} handleClick={handleClick} sortContition={sortContition} setSortContition={setSortContition} setOutputCondition={setOutputCondition} outputContition={outputContition}/>
        <PricesContainer loading={loading} prices={alteredPrices} fetchPrices={fetchPrices}/>
    </div>
  )
}

export default AdminPricesContent