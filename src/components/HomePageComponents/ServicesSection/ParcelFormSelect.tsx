"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ChevronDown, Check } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import PulseLoader from "react-spinners/PulseLoader"
import { Option } from "@/components/SharedComponents/ComboBox"

    interface ParcelFormSelectProps{
        placeholder: string;
        options: Option[];
        setInputValue: React.Dispatch<React.SetStateAction<string>>
        inputValue: string;
        toCityErr: boolean;
    }

const ParcelFormSelect:React.FC<ParcelFormSelectProps> = ({ placeholder, options, setInputValue, inputValue, toCityErr }) => {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const t = useTranslations("Services")

  const locale = useLocale()

  const getLocale = ( locale: string ) => {
    switch(locale) {
        case 'ro' : return 'ro'
        case 'ru' : return 'ru'
        case 'en' : return 'en'
        case 'fr' : return 'fr'
        default : return 'en'
    }
}

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${ toCityErr && 'animate-input-error' } w-full relative pb-0 lg:pt-[1rem] pt-[1.5rem] pl-[1.5rem] sm:h-[3.5rem] h-[4.667rem] justify-between border border-gray/25 rounded-[0.5rem] sm:text-[1rem] text-[1.333rem]`}
        >
          {value && options.find((option) => option.value === value)?.label[getLocale(locale)]}

            <div className="absolute origin-top-left h-full flex items-center left-[1.5rem] top-0 text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]">
              <motion.p
                className="origin-top-left "
                initial={{ scale: 1, y: '0%' }}
                animate={{
                  scale: open || options.find((option) => option.value === value)?.label ? 0.7 : 1,
                  y: open || options.find((option) => option.value === value)?.label ? '-30%' : '0%'
                }}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
              >
                { placeholder }
              </motion.p>
            </div>

          <ChevronDown className="ml-2 sm:size-[1rem] size-[1.333rem] shrink-0 text-dark-gray absolute right-[1.5rem] top-[50%] -translate-y-[50%]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15rem] bg-light-white border border-gray/25 rounded-[0.5rem] py-[0.5rem]">
        <Command>
          <CommandInput required placeholder={ t('selectBoxSearchPlaceholder') } className="bg-light-white w-full h-[3.5rem] outline-none sm:text-[1rem] text-[1.333rem] font-[400] text-dark-gray pl-[1rem] border-b border-gray/25 rounded-none mb-[0.5rem] py-[0.5rem]" />
          <CommandEmpty >{ t('selectBoxNothingFound') }</CommandEmpty>
          <CommandGroup className="max-h-[9.5rem] overflow-y-scroll">
              {
                options.length === 0 && (
                  <div className="w-full h-[6rem] grid place-content-center">
                      <PulseLoader 
                        size={5}
                        color="#B8BABC"
                        className="rotate-90"
                      />
                  </div>
                )
              }
            {options.map((option, index) => (
              <CommandItem
                key={index}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setInputValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
                className={`hover:bg-gray/10 transition-colors duration-300 sm:text-[1rem] text-[1.333rem] rounded-[0.5rem] p-[0.5rem] ${ value === option.value ? "bg-gray/10" : "" }`}
              >
                {option.label[getLocale(locale)]}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ParcelFormSelect