'use client'

import React, { useEffect, useState } from 'react'
import Filter from './FilterComponents/Filter'
import RoutesContainer from './RoutesContainer/RoutesContainer'

interface Order {
  id: string;
}

interface Bus {
  nr_of_seats: number;
}

interface Route {
  bus: Bus;
  stops: Stop[];
}

interface Label {
  en: string;
  ro: string;
  fr: string;
  ru: string;
}

interface Stop {
  city: string;
  country: string;
  hours: number;
  is_destination: boolean;
  label: Label;
  lat: number;
  lon: number;
}

export interface Travel {
  arrival: string;
  departure: string;
  free_places: number;
  reserved_seats: number;
  orders: Order[];
  route: Route;
}

export type TravelArray = Travel[];

const AdminRoutesContent = () => {

  const [loading, setLoading] = useState(true)
  const [travels, setTravels] = useState<TravelArray>([])
  const [alteredTravels, setAlteredTravels] = useState<TravelArray>([])

  const fetchTravels = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/travel');
      if (!response.ok) {
          setLoading(false)
          throw new Error('Failed to fetch prices');
      }
      const data = await response.json();
      setTravels(data)
      setAlteredTravels(data)
      setLoading(false)
  } catch (error) {
      setLoading(false)
      console.error('Error:', error);
  }
  }

  useEffect(() => {
    fetchTravels()
  }, [])

  const [sortContition, setSortContition] = useState<"resAsc" | "resDesc" | "newest" | "oldest" | "none">("none")
  const [outputContition, setOutputCondition] = useState<"all" | "tour" | "retour">("all")
  const [dateCondition, setDateCondition] = useState<string>("")

  const extractDate = ( textDate: string ) => {
    const date = new Date(textDate);
    const dateString = date.toISOString().split('T')[0];

    return dateString
}

  const filterByCountry = (travels: Travel[], startCountry: string): Travel[] => {
    return travels.filter(travel => travel.route.stops[0].country === startCountry);
  };

  const filterByDate = (travels: Travel[], date: string): Travel[] => {
    return travels.filter(travel => extractDate(travel.departure) === date);
  };

  const sortReservedSeatsAsc = (travels: TravelArray): TravelArray => {
    return [...travels].sort((a, b) => a.reserved_seats - b.reserved_seats);
  };

  const sortReservedSeatsDesc = (travels: TravelArray): TravelArray => {
    return [...travels].sort((a, b) => b.reserved_seats - a.reserved_seats);
  };

  const sortDepartureDateAsc = (travels: TravelArray): TravelArray => {
    return [...travels].sort((a, b) => new Date(a.departure).getTime() - new Date(b.departure).getTime());
  };

  const sortDepartureDateDesc = (travels: TravelArray): TravelArray => {
    return [...travels].sort((a, b) => new Date(b.departure).getTime() - new Date(a.departure).getTime());
  };

  const handleClick = () => {
    let tempTravels = [...travels]

    //date
    if(dateCondition !== '') tempTravels = filterByDate(tempTravels, dateCondition)

    //output
    if(outputContition === "tour") tempTravels = filterByCountry(tempTravels, "moldova")
    if(outputContition === "retour") tempTravels = filterByCountry(tempTravels, "switzerland")

    // sorting
    if(sortContition === 'resAsc') tempTravels = sortReservedSeatsAsc(tempTravels)
    if(sortContition === 'resDesc') tempTravels = sortReservedSeatsDesc(tempTravels)
    if(sortContition === 'newest') tempTravels = sortDepartureDateAsc(tempTravels)
    if(sortContition === 'oldest') tempTravels = sortDepartureDateDesc(tempTravels)

    setAlteredTravels(tempTravels)
  }

  const handleReset = () => {
    setDateCondition('')
    setSortContition('none')
    setOutputCondition('all')

    setAlteredTravels(travels)
  }

  return (
    <div className='pt-[9.5rem] flex xl:gap-[4rem] gap-[2rem] justify-center mb-[4rem]'>
        <Filter 
          sortContition={sortContition}
          setSortContition={setSortContition}
          outputContition={outputContition}
          setOutputCondition={setOutputCondition}
          dateCondition={dateCondition}
          setDateCondition={setDateCondition}
          handleClick={handleClick}
          handleReset={handleReset}
        />
        <RoutesContainer loading={loading} travels={alteredTravels}/>
    </div>
  )
}

export default AdminRoutesContent