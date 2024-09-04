import React from 'react'
import Filter from './FilterComponents/Filter'
import RoutesContainer from './RoutesContainer/RoutesContainer'

const AdminRoutesContent = () => {
  return (
    <div className='pt-[9.5rem] flex gap-[4rem] justify-center'>
        <Filter />
        <RoutesContainer />
    </div>
  )
}

export default AdminRoutesContent