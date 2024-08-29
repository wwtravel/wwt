'use client'

import { SearchPageHeader, SearchPageContent, NavBar, Footer, SearchReturnHeader, SearchReturnContent, Checkout } from '@/components'
import { Travel } from '@/types/routeType'
import { useState } from 'react'

export interface SelectedRoutes{
    departureRoute : Travel | null;
    returnRoute : Travel | null;
    shouldReturn : boolean;
}

const PageContent = () => {


  const [selectedRoutes, setSelectedRoutes] = useState<SelectedRoutes>({
    departureRoute: null,
    returnRoute: null,
    shouldReturn: false
  })

  return (
    <div>
        <NavBar />
            {
                !selectedRoutes.departureRoute && !selectedRoutes.returnRoute && (
                    <>
                        <SearchPageHeader />
                        <SearchPageContent setSelectedRoutes={setSelectedRoutes}/>
                    </>
                )
            }
            {
                selectedRoutes.departureRoute && selectedRoutes.shouldReturn && !selectedRoutes.returnRoute && (
                    <>
                        <SearchReturnHeader seletcedRoute={selectedRoutes.departureRoute} setSelectedRoutes={setSelectedRoutes}/>
                        <SearchReturnContent />
                    </>
                )
            }
            {
                selectedRoutes.departureRoute && !selectedRoutes.shouldReturn || selectedRoutes.departureRoute && selectedRoutes.shouldReturn && selectedRoutes.returnRoute && (
                    <Checkout />
                )
            }
        <Footer />
    </div>
  )
}

export default PageContent