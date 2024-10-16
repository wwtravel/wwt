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

export interface LuggagePrice {
  id: string;
  price: number;
}

export type PricesArray = Price[];

const AdminPricesContent = () => {

  const [loading, setLoading] = useState(true)
  const [prices, setPrices] = useState<PricesArray>([])
  const [alteredPrices, setAlteredPrices] = useState<PricesArray>([])
  const [luggagePrice, setLuggagePrice] = useState<LuggagePrice>()

  async function fetchPrices() {
    setLoading(true)
    try {
        const response = await fetch('/api/price');
        if (!response.ok) {
            setLoading(false)
            throw new Error('Failed to fetch prices');
        }
        const data = await response.json();
        setLuggagePrice(data.luggagePrice)
        setPrices(data.travelPrices)
        setAlteredPrices(data.travelPrices)
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

  const [showLuggage, setShowLuggage] = useState(true)

  const handleClick = () => {
    let tempPrices = [...prices]
    setShowLuggage(true)

    //output
    if(outputContition === "au-gr") {
      tempPrices = filterByCities(tempPrices, "austria", "germany")
      setShowLuggage(false)
    }
    if(outputContition === "au-fr") {
      tempPrices = filterByCities(tempPrices, "austria", "france")
      setShowLuggage(false)
    }
    if(outputContition === "gr-fr") {
      tempPrices = filterByCities(tempPrices, "germany", "france")
      setShowLuggage(false)
    }
    if(outputContition === "md-au") {
      tempPrices = filterByCities(tempPrices, "moldova", "austria")
      setShowLuggage(false)
    }
    if(outputContition === "md-fr") {
      tempPrices = filterByCities(tempPrices, "moldova", "france")
      setShowLuggage(false)
    }
    if(outputContition === "md-gr") {
      tempPrices = filterByCities(tempPrices, "moldova", "germany")
      setShowLuggage(false)
    }
    if(outputContition === "md-sw") {
      tempPrices = filterByCities(tempPrices, "moldova", "switzerland")
      setShowLuggage(false)
    }
    if(outputContition === "gr-sw") {
      tempPrices = filterByCities(tempPrices, "germany", "switzerland")
      setShowLuggage(false)
    }
    if(outputContition === "au-sw") {
      tempPrices = filterByCities(tempPrices, "austria", "switzerland")
      setShowLuggage(false)
    }
    if(outputContition === "fr-sw") {
      tempPrices = filterByCities(tempPrices, "france", "switzerland")
      setShowLuggage(false)
    }
    if(outputContition === "parcels") {
      tempPrices = filterByCities(tempPrices, "parcels", "parcels")
      setShowLuggage(true)
    }

    // sorting
    if(sortContition === 'priceAsc') tempPrices = sortByAdultPriceAsc(tempPrices)
    if(sortContition === 'priceDesc') tempPrices = sortByAdultPriceDesc(tempPrices)

    setAlteredPrices(tempPrices)
  }

  const handleReset = () => {
    setOutputCondition('all')
    setSortContition('none')
    setShowLuggage(true)

    setAlteredPrices(prices)
  }


  const [sortContition, setSortContition] = useState<"priceAsc" | "priceDesc" | "none">("none")
  const [outputContition, setOutputCondition] = useState<"all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr" | "gr-sw" | "au-sw" | "fr-sw" | "parcels">("all")

  return (
    <div className='pt-[9.5rem] flex xl:gap-[4rem] gap-[2rem] justify-center mb-[5rem]'>
        <PricesFilter handleReset={handleReset} handleClick={handleClick} sortContition={sortContition} setSortContition={setSortContition} setOutputCondition={setOutputCondition} outputContition={outputContition}/>
        <PricesContainer showLuggage={showLuggage} luggagePrice={luggagePrice} loading={loading} prices={alteredPrices} fetchPrices={fetchPrices}/>
    </div>
  )
}

export default AdminPricesContent