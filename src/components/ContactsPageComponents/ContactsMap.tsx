import ItineraryMap from "../SharedComponents/ItineraryMap"

import { Coordinate } from "@/constants/coordinates"
const ContactsMap = () => {
  const mark: Coordinate[] = [
    {
      latitude: 47.01074785922845, 
      longitude: 28.836395966169487,
    }
  ]

  return (
    <div className='flex-1 border border-gray/25 rounded-[0.5rem] overflow-hidden h-full shadow-custom'>
      <ItineraryMap center={[ mark[0].latitude, mark[0].longitude ]} coordinates={mark} zoom={17}/>
    </div>
  )
}

export default ContactsMap
