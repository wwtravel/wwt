'use client'

import { useState, useEffect, useCallback } from "react"
import { carouselData } from "@/constants/carouselData"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"


import Autoplay from "embla-carousel-autoplay"

import CarouselDots from "./CarouselDots"
import CarouselItemCustom from "./CarouselItemCustom"

const DestinationsCarousel = () => {

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

  return (
    <Carousel 
      className="max-w-[85rem] w-full mx-auto select-none"
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
          <CarouselItem >
              <Card className="rounded-[1rem] border-none"> 
                <CardContent className="p-0 flex justify-between px-[2rem] pb-[2rem]">
                  {
                    carouselData['slide1'].map((item, index) => (
                        <CarouselItemCustom item={item} key={index} />
                    ))
                  }
                </CardContent>
              </Card>
          </CarouselItem>

          <CarouselItem >
              <Card className="rounded-[1rem] border-none"> 
                <CardContent className="p-0 flex justify-between px-[2rem] pb-[2rem]">
                  {
                      carouselData['slide2'].map((item, index) => (
                        <CarouselItemCustom item={item} key={index} />
                      ))
                    }
                </CardContent>
              </Card>
          </CarouselItem>

          <CarouselItem >
              <Card className="rounded-[1rem] border-none"> 
                <CardContent className="p-0 flex justify-between px-[2rem] pb-[2rem]">
                  {
                      carouselData['slide3'].map((item, index) => (
                        <CarouselItemCustom item={item} key={index} />
                      ))
                    }
                </CardContent>
              </Card>
          </CarouselItem>

      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
      <CarouselDots api={api} itemsLength={Object.keys(carouselData).length} activeSlide={activeSlide} />
    </Carousel>
  )
}

export default DestinationsCarousel