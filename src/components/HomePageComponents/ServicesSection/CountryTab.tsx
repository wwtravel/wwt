import React from 'react'

interface CountryTabProps{
    country : "france" | "austria" | "germany" | "switzerland";
    imageURL: string;
    text: string;
    shouldAddBorder: boolean;
    activeCountry: string;
    setActiveCountry: React.Dispatch<React.SetStateAction<"france" | "austria" | "germany" | "switzerland">>;
}

const CountryTab:React.FC<CountryTabProps> = ({ country, imageURL, text, shouldAddBorder, activeCountry, setActiveCountry }) => {
  return (
    <div onClick={() => setActiveCountry(country)} className={`flex transition-colors duration-300 cursor-pointer gap-[1.5rem] items-center justify-center w-full h-[5rem] ${ shouldAddBorder && 'border-r border-light-white' } ${activeCountry === country ? 'bg-light-white' : 'bg-red'}`}>
        <p className={`md:text-[1.5rem] sm:text-[1rem] text-[0.80rem] font-montserrat font-bold uppercase ${ activeCountry === country ? 'text-red' : 'text-light-white' }`}>{ text }</p>
        <img src={imageURL} alt="country-icon" draggable={false} className='size-[2rem] max-lg:hidden' />
    </div>
  )
}

export default CountryTab