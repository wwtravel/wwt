'use client'

import { useState, useEffect, useCallback } from "react"
import { carouselDataMobile } from "@/constants/carouselData"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi
} from "@/components/ui/carousel"
import { useLocale, useTranslations } from "next-intl"
import RedButton from "@/components/SharedComponents/RedButton"
import DestinationPrice from "./DestinationPrice"

import Autoplay from "embla-carousel-autoplay"

import CarouselDots from "./CarouselDots"
import CarouselItemCustom from "./CarouselItemCustom"

const MobileDestinationsCarousel = () => {

  const [api, setApi] = useState<CarouselApi>()
  const [activeSlide, setActiveSlide] = useState(0)

  const locale = useLocale()

  const getLocale = (value: string) => {
    switch(value){
      case 'ro' : return 'ro';
      case 'ru' : return 'ru';
      case 'en' : return 'en';
      case 'fr' : return 'fr';
      default : return 'en';
    }
  }
 
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
                            <CardContent className="p-0 px-[2rem] pb-[1.333rem]">
                              <CarouselItemCustom item={item} key={index} />
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