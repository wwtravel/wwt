import { CarouselApi } from "@/components/ui/carousel"


interface CarouselDotsProps{
    itemsLength : number;
    activeSlide : number | undefined;
    api: CarouselApi | undefined;
}

const CarouselDots:React.FC<CarouselDotsProps> = ({ itemsLength, activeSlide, api }) => {
  return (
    <div className="flex gap-[0.5rem] justify-center">
        {Array.from({ length: itemsLength }).map((_, index) => (
        <div
          onClick={() => {
            if(api) api.scrollTo(index)
          }}
          key={index}
          className={`h-[0.625rem] rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
            index === activeSlide
              ? "bg-red w-[1.5rem]"
              : "bg-[#D9D9D9] w-[1rem]"
          }`}
        />
      ))}
    </div>
  )
}

export default CarouselDots