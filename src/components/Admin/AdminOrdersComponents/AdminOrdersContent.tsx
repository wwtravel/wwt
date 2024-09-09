'use client'

import React, { useEffect, useState } from 'react'
import OrdersFilter from './OrdersFilter/OrdersFilter'
import OrdersContainer from './OrdersContainer/OrdersContainer'

export interface Order_Date_obj{
  date: string;
  orders: Order[];
}

interface ContactDetails {
  email: string;
  notes: string;
  phone_number: string;
}

interface Place{
  country: string;
  city: string;
  label : {
    ro: string;
    en: string;
    ru: string;
    fr: string;
  }
}

interface Passenger {
  firstname: string;
  lastname: string;
  price: {
    value: number;
    currency: string;
  }
}

interface Travel {
  route_id: string;
  travel_id: string;
}

export interface Order {
  id: string;
  public_id: string;
  order_date: string;
  contact_details: ContactDetails;
  passengers: Passenger[];
  travel: Travel;
  travel_id: string;
  arrival_place: Place;
  departure_place: Place;
  arrival_date: string;
  departure_date: string;
  user_id: string | null;
}

const AdminOrdersContent = () => {

  const [groupedOrders, setGroupedOrders] = useState<Order_Date_obj[]>()
  const [orders, setOrders] = useState<Order[]>([])
  const [alteredOrders, setAlteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTravels = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/order');
      if (!response.ok) {
          setLoading(false)
          throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data)
      setAlteredOrders(data)
      setLoading(false)
  } catch (error) {
      setLoading(false)
      console.error('Error:', error);
  }
  }

  useEffect(() => {
    fetchTravels()
  }, [])

  const [searchCondition, setSearchCondition] = useState<string>("")
  const [outputContition, setOutputCondition] = useState<"all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr">("all")
  const [dateCondition, setDateCondition] = useState<string>("")

  const extractDate = ( textDate: string ) => {
    const date = new Date(textDate);
    const dateString = date.toISOString().split('T')[0];

    return dateString
  }

  const filterByDate = (orders: Order[], date: string): Order[] => {
    return orders.filter(order => extractDate(order.order_date) === date);
  };

  const filterBySearch = (orders: Order[], input: string): Order[] => {
  return orders.filter(order => 
    order.public_id === input || 
    order.passengers.some(passenger => 
      passenger.firstname === input || passenger.lastname === input
    )
  );
};

  const filterByCountries = (orders: Order[], fromCountry: string, toCountry: string): Order[] => {
    return orders.filter(order => order.departure_place.country === fromCountry && order.arrival_place.country === toCountry);
  };

  const handleClick = () => {
    let tempOrders = [...orders]

    //date
    if(dateCondition !== '') tempOrders = filterByDate(tempOrders, dateCondition)

    //output
    if(outputContition === "au-gr") tempOrders = filterByCountries(tempOrders, "austria", "germany")
    if(outputContition === "au-fr") tempOrders = filterByCountries(tempOrders, "austria", "france")
    if(outputContition === "gr-fr") tempOrders = filterByCountries(tempOrders, "germany", "france")
    if(outputContition === "md-au") tempOrders = filterByCountries(tempOrders, "moldova", "austria")
    if(outputContition === "md-fr") tempOrders = filterByCountries(tempOrders, "moldova", "france")
    if(outputContition === "md-gr") tempOrders = filterByCountries(tempOrders, "moldova", "germany")
    if(outputContition === "md-sw") tempOrders = filterByCountries(tempOrders, "moldova", "switzerland")

    //id/name/surname
    if(searchCondition !== '') {
      tempOrders = filterBySearch(tempOrders, searchCondition)
    }

    setAlteredOrders(tempOrders)
  }


  useEffect(() => {
    const dates : string[] = []
    
    if(alteredOrders){
      alteredOrders.map(order => {
        dates.push(extractDate(order.order_date))
      })
    }

    const uniqueSortedDates = Array.from(new Set(dates)).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });

    const orderGroups: Order_Date_obj[] = uniqueSortedDates.map(date => {
      const ordersForDate = alteredOrders.filter(order => extractDate(order.order_date) === date);
      return {
        date: date,
        orders: ordersForDate
      };
    });
  
    setGroupedOrders(orderGroups);
  }, [alteredOrders])

  const handleReset = () => {
    setDateCondition('')
    setSearchCondition('')
    setOutputCondition('all')


    setAlteredOrders(orders)
  }



  return (
    <div className='pt-[9.5rem] flex xl:gap-[4rem] gap-[2rem] justify-center mb-[4rem]'>
      <OrdersFilter handleReset={handleReset} handleClick={handleClick} dateCondition={dateCondition} setDateCondition={setDateCondition} searchCondition={searchCondition} setSearchCondition={setSearchCondition} outputContition={outputContition} setOutputCondition={setOutputCondition}/>
      <OrdersContainer groupedOrders={groupedOrders} loading={loading}/>
    </div>
  )
}

export default AdminOrdersContent