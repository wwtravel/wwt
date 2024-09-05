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
  lat: string;
  lon: string;
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
      setLoading(false)
  } catch (error) {
      setLoading(false)
      console.error('Error:', error);
  }
  }

  useEffect(() => {
    fetchTravels()
  }, [])
  console.log(travels)

  const [sortContition, setSortContition] = useState<"resAsc" | "resDesc" | "newest" | "oldest" | "none">("none")
  const [outputContition, setOutputCondition] = useState<"all" | "tour" | "retour">("all")
  const [dateCondition, setDateCondition] = useState<string>("")

  return (
    <div className='pt-[9.5rem] flex gap-[4rem] justify-center'>
        <Filter 
          sortContition={sortContition}
          setSortContition={setSortContition}
          outputContition={outputContition}
          setOutputCondition={setOutputCondition}
          dateCondition={dateCondition}
          setDateCondition={setDateCondition}
        />
        <RoutesContainer loading={loading} travels={travels}/>
    </div>
  )
}

export default AdminRoutesContent