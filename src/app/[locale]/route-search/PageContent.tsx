'use client'

import { SearchPageHeader, SearchPageContent, NavBar, Footer, SearchReturnHeader, SearchReturnContent, Checkout } from '@/components'
import { Travel } from '@/types/routeType'
import { useState } from 'react'
import { TravelResponseFull } from './FetchContainer';
import CheckoutSuccess from '@/components/SearchPageComponents/CheckoutSuccess/CheckoutSuccess';

export interface SelectedRoutes{
    departureRoute : Travel | null;
    returnRoute : Travel | null;
    shouldReturn : boolean;
}

interface PageContentProps{
  routes: TravelResponseFull;
  loading: boolean;
}

const PageContent:React.FC<PageContentProps> = ({ routes, loading }) => {


  const [selectedRoutes, setSelectedRoutes] = useState<SelectedRoutes>({
    departureRoute: null,
    returnRoute: null,
    shouldReturn: false
  })

  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  return (
    <div>
        <NavBar />

        {
          checkoutSuccess 
          ? <CheckoutSuccess />
          : (
            <>
              {
                  !selectedRoutes.departureRoute && !selectedRoutes.returnRoute && (
                      <>
                          <SearchPageHeader />
                          <SearchPageContent loading={loading} routes={routes.tour} setSelectedRoutes={setSelectedRoutes}/>
                      </>
                  )
              }
              {
                  selectedRoutes.departureRoute && selectedRoutes.shouldReturn && !selectedRoutes.returnRoute && (
                      <>
                          <SearchReturnHeader seletcedRoute={selectedRoutes.departureRoute} setSelectedRoutes={setSelectedRoutes}/>
                          <SearchReturnContent loading={loading} routes={routes.return} seletcedRoute={selectedRoutes.departureRoute} setSelectedRoutes={setSelectedRoutes}/>
                      </>
                  )
              }
              {
                  (selectedRoutes.departureRoute && !selectedRoutes.shouldReturn) || 
                  (selectedRoutes.departureRoute && selectedRoutes.shouldReturn && selectedRoutes.returnRoute) ? (
                    <Checkout 
                      setSelectedRoutes={setSelectedRoutes} 
                      seletcedDepartureRoute={selectedRoutes.departureRoute} 
                      seletcedArrivalRoute={selectedRoutes.returnRoute} 
                      setCheckoutSuccess={setCheckoutSuccess}
                    />
                  ) : null
              }
            </>
          )
        }
        <Footer />
    </div>
  )
}

export default PageContent