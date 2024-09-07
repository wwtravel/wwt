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

interface Passenger {
  firstname: string;
  lastname: string;
  price: number;
}

interface Travel {
  route_id: string;
  travel_id: string;
}

export interface Order {
  id: string;
  order_date: string;
  contact_details: ContactDetails;
  passengers: Passenger[];
  travel: Travel;
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
          throw new Error('Failed to fetch prices');
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
  const [outputContition, setOutputCondition] = useState<"all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr" | "parcels">("all")
  const [dateCondition, setDateCondition] = useState<string>("")

  const extractDate = ( textDate: string ) => {
    const date = new Date(textDate);
    const dateString = date.toISOString().split('T')[0];

    return dateString
  }

  useEffect(() => {
    const dates : string[] = []
    
    if(orders){
      orders.map(order => {
        dates.push(order.order_date)
      })
    }

    const uniqueSortedDates = Array.from(new Set(dates)).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });

    const orderGroups: Order_Date_obj[] = uniqueSortedDates.map(date => {
      const ordersForDate = orders.filter(order => order.order_date === date);
      return {
        date: date,
        orders: ordersForDate
      };
    });
  
    setGroupedOrders(orderGroups);
  }, [orders])



  return (
    <div className='pt-[9.5rem] flex xl:gap-[4rem] gap-[2rem] justify-center mb-[4rem]'>
      <OrdersFilter dateCondition={dateCondition} setDateCondition={setDateCondition} searchCondition={searchCondition} setSearchCondition={setSearchCondition} outputContition={outputContition} setOutputCondition={setOutputCondition}/>
      <OrdersContainer groupedOrders={groupedOrders} loading={loading}/>
    </div>
  )
}

export default AdminOrdersContent