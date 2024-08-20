'use client'

import { useState, useEffect, useCallback } from "react"
import { testimonialsData } from "@/constants/testimonialsData"

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

import Autoplay from "embla-carousel-autoplay"

import CarouselDots from "./CarouselDots"
import CarouselCard from "./CarouselCard"

const TestimonialsCarousel = () => {

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

  const t = useTranslations("AboutPage_Testimonials")

  return (
    <Carousel 
      className="max-w-[78.5rem] mx-auto w-full select-none relative"
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
      <img src="/icons/icon-dotted-square.svg" alt="dots" draggable={false} className='absolute -translate-y-1/3 translate-x-1/3 top-0 right-0 size-[6rem]' />
      <CarouselContent>
          <CarouselItem className="flex items-stretch">
              <Card className="rounded-[1rem] border-none flex items-stretch w-full"> 
                <CardContent className="p-0 flex justify-between pl-[6rem] pr-[2rem] pb-[2rem] w-full">
                  <CarouselCard imgUrl={ testimonialsData[0].imgUrl } name={ testimonialsData[0].name } text={ t(testimonialsData[0].text) } role={t(testimonialsData[0].role)}/>
                  <CarouselCard imgUrl={ testimonialsData[1].imgUrl } name={ testimonialsData[1].name } text={ t(testimonialsData[1].text) } role={t(testimonialsData[1].role)}/>
                </CardContent>
              </Card>
          </CarouselItem>

          <CarouselItem className="flex items-stretch">
              <Card className="rounded-[1rem] border-none flex items-stretch w-full"> 
                <CardContent className="p-0 flex justify-between pl-[6rem] pb-[2rem] pr-[2rem] w-full">
                    <CarouselCard imgUrl={ testimonialsData[2].imgUrl } name={ testimonialsData[2].name } text={ t(testimonialsData[2].text) } role={t(testimonialsData[2].role)}/>
                    <CarouselCard imgUrl={ testimonialsData[3].imgUrl } name={ testimonialsData[3].name } text={ t(testimonialsData[3].text) } role={t(testimonialsData[3].role)}/>
                </CardContent>
              </Card>
          </CarouselItem>

      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
      <CarouselDots api={api} itemsLength={2} activeSlide={activeSlide} />
    </Carousel>
  )
}

export default TestimonialsCarousel