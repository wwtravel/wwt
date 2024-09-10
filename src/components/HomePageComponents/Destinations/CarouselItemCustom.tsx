import React, { useEffect, useState } from 'react'
import DestinationPrice from './DestinationPrice';
import RedButton from '@/components/SharedComponents/RedButton';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import Image from 'next/image';
import { Price } from '../ServicesSection/PassengerInfo';

interface Item{
    city: string;
    imageURL: string;
    price: number;
    title: {
        ro: string;
        en: string;
        fr: string;
        ru: string;
    };
    departureText: string;
    startPoint: {
        ro: string;
        en: string;
        fr: string;
        ru: string;
    };
    features: string;
    wifi: boolean;
    wc: boolean;
    ac: boolean;
    socket: boolean;
    minibar: boolean;
    multimedia: boolean;
}

interface CarouselItemCustomProps{
    item: Item
}

const CarouselItemCustom: React.FC<CarouselItemCustomProps> = ({ item }) => {

    const extractDateToShow = (textDate: string): string => {
        const date = new Date(textDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}.${month}.${year}`;
      };

      const extractDate = (textDate: string): string => {
        const date = new Date(textDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${year}-${month}-${day}`;
      };

    const fetchNearestDate = async (city : string) => {
        try {
          const response = await fetch(`/api/nearest-travel/${city}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();

          setDate(extractDate(data.nearestDate))
          setToShowDate(extractDateToShow(data.nearestDate))
          data.nearestDate;
        } catch (error) {
          console.error('Error fetching nearest date:', error);
          return null;
        }
      };

      useEffect(() => {
        fetchNearestDate(item.city)
      }, [])

      const [date, setDate] = useState('')
      const [toShowDate, setToShowDate] = useState("―")

    const t = useTranslations("Destinations")

    const locale = useLocale()
    const router = useRouter()

  const getLocale = (value: string) => {
    switch(value){
      case 'ro' : return 'ro';
      case 'ru' : return 'ru';
      case 'en' : return 'en';
      case 'fr' : return 'fr';
      default : return 'en';
    }
  }

  const handleClick = () => {
    if(date !== ''){
        router.push(`/route-search?dep=chisinau&arr=${item.city}&depdate=${date}&r=false`)
    }
  }

  const [prices, setPrices] = useState<Price[]>([])
  const [countryPrice, setCountryPrice] = useState(0) 

  async function fetchPrices() {
    try {
        const response = await fetch('/api/price');
        if (!response.ok) {
            throw new Error('Failed to fetch prices');
        }
        const data = await response.json();
        console.log(data)
        setPrices(data.travelPrices)
    } catch (error) {
        console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchPrices()
  }, [])

  useEffect(() => {
    if(prices.length !== 0){
      prices.map(price => {
        if(price.from === 'moldova' && price.to === 'switzerland'){
          setCountryPrice(price.price_sheet.adult)
        }
      })
    }
  }, [prices])

  return (
    <div className="bg-light-white w-[25rem] rounded-[1rem] overflow-hidden border border-gray/25 relative shadow-custom">
        <DestinationPrice price={countryPrice}/>
        <div className='relative h-[16rem]'>
          <Image className="h-[16rem] z-0" quality={100} fill src={item.imageURL} alt="carouse-image" draggable={false} />
        </div>
        <div className="mt-[2rem] px-[1.5rem] pb-[1.5rem]">
            <h3 className="text-[1.5rem] text-dark-gray font-montserrat font-bold">{ item.title[getLocale(locale)] }</h3>
            <p className="text-[1.125rem] text-dark-gray font-open-sans font-[400] mb-[0.5rem] mt-[1rem]">{ t(item.departureText) } <span className="font-bold">{toShowDate}</span></p>
            <p className="text-[1.125rem] text-dark-gray font-open-sans font-[400] mb-[0.5rem]">{ t('cardStartPoint') } - { item.startPoint[getLocale(locale)] }</p>
            <p className="text-[1.125rem] text-dark-gray font-open-sans font-[400] mb-[0.5rem]">{ t(item.features) }:</p>
            <div className="flex gap-[1rem] mb-[1rem]">
                <img className="size-[1.5rem]" src={`/icons/destinations-icons/${item.wifi ? 'icon-wifi.svg' : 'icon-wifi-disabled.svg'}`} alt="feaureIcon" draggable={false} />
                <img className="size-[1.5rem]" src={`/icons/destinations-icons/${item.wc ? 'icon-wc.svg' : 'icon-wc-disabled.svg'}`} alt="feaureIcon" draggable={false} />
                <img className="size-[1.5rem]" src={`/icons/destinations-icons/${item.ac ? 'icon-ac.svg' : 'icon-ac-disabled.svg'}`} alt="feaureIcon" draggable={false} />
                <img className="size-[1.5rem]" src={`/icons/destinations-icons/${item.socket ? 'icon-socket.svg' : 'icon-socket-disabled.svg'}`} alt="feaureIcon" draggable={false} />
                <img className="size-[1.5rem]" src={`/icons/destinations-icons/${item.minibar ? 'icon-minibar.svg' : 'icon-minibar-disabled.svg'}`} alt="feaureIcon" draggable={false} />
                <img className="size-[1.5rem]" src={`/icons/destinations-icons/${item.multimedia ? 'icon-multimedia.svg' : 'icon-multimedia-disabled.svg'}`} alt="feaureIcon" draggable={false} />
            </div>

            <div onClick={handleClick}>
                <RedButton text={t('cardButtonText')}/>
            </div>
        </div>
    </div>
  )
}

export default CarouselItemCustom