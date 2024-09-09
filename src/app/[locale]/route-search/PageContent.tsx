'use client'

import { SearchPageHeader, SearchPageContent, NavBar, Footer, SearchReturnHeader, SearchReturnContent, Checkout } from '@/components'
import { Travel } from '@/types/routeType'
import { useEffect, useState } from 'react'
import { TravelResponseFull } from './FetchContainer';
import CheckoutSuccess from '@/components/SearchPageComponents/CheckoutSuccess/CheckoutSuccess';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/SharedComponents/Loader';

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

  const [showLoader, setShowLoader] = useState(false)


  const [selectedRoutes, setSelectedRoutes] = useState<SelectedRoutes>({
    departureRoute: null,
    returnRoute: null,
    shouldReturn: false
  })

  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  useEffect(() => {
    setShowLoader(true)
    
    setTimeout(() => {
      setShowLoader(false)
    }, 1000)
  }, [selectedRoutes, checkoutSuccess])


  return (
    <div>
        <NavBar />
        <AnimatePresence>
            {
                showLoader && <Loader />
            }
        </AnimatePresence>
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
                        shouldReturn={ selectedRoutes.shouldReturn }
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