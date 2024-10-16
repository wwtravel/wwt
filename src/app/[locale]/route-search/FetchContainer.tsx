'use client'

import { useSearchParams } from "next/navigation"
import PageContent from "./PageContent"
import { useEffect, useState } from "react"
import { TravelResponse } from "@/types/routeType"

export interface TravelResponseFull{
    tour: TravelResponse;
    return: TravelResponse;
}

const FetchContainer = () => {

    const searchParams = useSearchParams()

    const [routes, setRoutes] = useState<TravelResponseFull>({
        tour: [],
        return: []
    })
    const [loading, setLoading] = useState(true)

    const searchRoutes = async (departureCity: string, arrivalCity: string, departureDate: string, arrivalDate: string | null) => {
        try {
            setLoading(true)
            setRoutes({
                tour: [],
                return: []
            })

            const body: any = {
                departure_city: departureCity,
                arrival_city: arrivalCity,
                departure_date: departureDate,
                ...(arrivalDate && { return_date: arrivalDate })
            };
    
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
    
            if (!response.ok) {
                setLoading(false)
                const errorData = await response.json();
                throw new Error(errorData.msg || 'An error occurred while searching for routes.');
            }
    
            const result = await response.json();
            console.log(result)
            setRoutes({
                tour: result.toures,
                return: result.return_toures
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error:', error);
            throw error;
        }
    };
    
    useEffect(() => {

        const depCity = searchParams.get('dep');
        const arrCity = searchParams.get('arr');
        const depDate = searchParams.get('depdate');
        const arrDate = searchParams.get('arrdate');

        if (depCity && arrCity && depDate) {
            searchRoutes(depCity, arrCity, depDate, arrDate);
        } else {
            
        }

    }, [searchParams])

  return (
    <div>
        <PageContent loading={loading} routes={routes} />
    </div>
  )
}

export default FetchContainer