'use client'

import React, { useState } from 'react'
import OrdersFilter from './OrdersFilter/OrdersFilter'
import OrdersContainer from './OrdersContainer/OrdersContainer'

const AdminOrdersContent = () => {

  const [searchCondition, setSearchCondition] = useState<string>("")
  const [outputContition, setOutputCondition] = useState<"all" | "md-sw" | "md-gr" | "md-fr" | "md-au" | "au-gr" | "au-fr" | "gr-fr" | "parcels">("all")
  const [dateCondition, setDateCondition] = useState<string>("")

  const extractDate = ( textDate: string ) => {
    const date = new Date(textDate);
    const dateString = date.toISOString().split('T')[0];

    return dateString
}

  return (
    <div className='pt-[9.5rem] flex xl:gap-[4rem] gap-[2rem] justify-center mb-[4rem]'>
      <OrdersFilter dateCondition={dateCondition} setDateCondition={setDateCondition} searchCondition={searchCondition} setSearchCondition={setSearchCondition} outputContition={outputContition} setOutputCondition={setOutputCondition}/>
      <OrdersContainer />
    </div>
  )
}

export default AdminOrdersContent