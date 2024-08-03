'use client'

import { useState, useEffect, useCallback } from "react"
import { carouselDataMobile } from "@/constants/carouselData"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"
import { useTranslations } from "next-intl"
import RedButton from "@/components/SharedComponents/RedButton"
import DestinationPrice from "./DestinationPrice"

import Autoplay from "embla-carousel-autoplay"

import CarouselDots from "./CarouselDots"

const MobileDestinationsCarousel = () => {

  const [api, setApi] = useState<CarouselApi>()
  const [activeSlide, setActiveSlide] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    api.on("select", () => {
      setActiveSlide(api.selectedScrollSnap())
    })
  }, [api])
  const t = useTranslations("Destinations")

  return (
    <Carousel 
      className="w-[29rem] mx-auto select-none"
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 8000,
          stopOnInteraction: false
        })
      ]}
      opts={{
        loop: true
      }}
    >
        <CarouselContent>

            {
                carouselDataMobile.map((item, index) => (
                    <CarouselItem key={index}>
                        <Card className="rounded-[1rem] border-none"> 
                            <CardContent className="p-0 px-[2rem] pb-[2rem]">
                                    <div className="bg-light-white rounded-[1rem] overflow-hidden border border-gray/25 relative shadow-custom">
                                        <DestinationPrice price={item.price}/>
                                        <img className="h-[16rem]" src={item.imageURL} alt="carouse-image" draggable={false} />
                                        <div className="mt-[2rem] px-[1.5rem] pb-[1.5rem]">
                                            <h3 className="text-[1.5rem] text-dark-gray font-montserrat font-bold">{ t(item.title) }</h3>
                                            <p className="text-[1.125rem] text-dark-gray font-open-sans font-[400] mb-[0.5rem] mt-[1rem]">{ t(item.departureText) } <span className="font-bold">20.03.2024</span></p>
                                            <p className="text-[1.125rem] text-dark-gray font-open-sans font-[400] mb-[0.5rem]">{ t(item.startPoint) }</p>
                                            <p className="text-[1.125rem] text-dark-gray font-open-sans font-[400] mb-[0.5rem]">{ t(item.features) }:</p>
                                            <div className="flex gap-[1rem] mb-[1rem]">
                                                <img className="size-[1.5rem]" src={`/icons/${item.wifi ? 'icon-wifi.svg' : 'icon-wifi-disabled.svg'}`} alt="feaureIcon" draggable={false} />
                                                <img className="size-[1.5rem]" src={`/icons/${item.food ? 'icon-food.svg' : 'icon-food-disabled.svg'}`} alt="feaureIcon" draggable={false} />
                                                <img className="size-[1.5rem]" src={`/icons/${item.luggage ? 'icon-luggage.svg' : 'icon-luggage-disabled.svg'}`} alt="feaureIcon" draggable={false} />
                                            </div>
                                            <RedButton text={t('cardButtonText')}/>
                                        </div>
                                    </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                )) 
            }


        </CarouselContent>

        <CarouselDots api={api} itemsLength={carouselDataMobile.length} activeSlide={activeSlide} />
    </Carousel>
  )
}

export default MobileDestinationsCarousel