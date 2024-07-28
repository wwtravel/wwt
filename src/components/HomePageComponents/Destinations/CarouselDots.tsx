
interface CarouselDotsProps{
    itemsLength : number;
    activeSlide : number | undefined;
}

const CarouselDots:React.FC<CarouselDotsProps> = ({ itemsLength, activeSlide }) => {
  return (
    <div className="flex gap-[0.5rem] justify-center mt-[2rem]">
        {Array.from({ length: itemsLength }).map((_, index) => (
        <div
          key={index}
          className={`h-[0.625rem] w-[1rem] rounded-full transition-all duration-300 ease-in-out ${
            index === activeSlide
              ? "bg-red w-[1.5rem]"
              : "bg-[#D9D9D9]"
          }`}
        />
      ))}
    </div>
  )
}

export default CarouselDots