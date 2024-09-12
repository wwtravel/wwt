'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandSeparator,
  Command
} from "@/components/ui/command"


import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { RemoveScrollBar } from "react-remove-scroll-bar";

import PulseLoader from "react-spinners/PulseLoader";

export interface Option{
  label : {
    en : string;
    ro : string;
    ru : string;
    fr : string;
  };
  value : string;
}

interface ComboBoxProps{
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  errTrigger: boolean;
}

const ComboBox:React.FC<ComboBoxProps> = ({ placeholder, options, value, onChange, errTrigger }) => {

  const locale = useLocale()

  const t = useTranslations("Header")

  const inputRef = useRef<HTMLInputElement>(null)
  
  const [isFocused, setIsFocused] = useState(false)
  const [inputContent, setInputContent] = useState(value)

  useEffect(() => {
    if(options) {
      options.map((option) => {
        if(option.value === value) {
          setInputContent(option.label[getLocale(locale)])
          return
        }
      })
    }
  }, [value, options])

  const handleInputChange = (newLabel: string, newValue: string) => {
    setInputContent(newLabel)
    onChange(newValue)
  }

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
    <div>
      <Command className="bg-[transparent] overflow-visible">
        <Popover open={isFocused} onOpenChange={setIsFocused}>
          <PopoverTrigger className="overflow-visible" asChild onClick={(e) => { e.preventDefault() }}>
            <div className="relative">
              <div 
                className="relative"
                onClick={() => {setIsFocused(true); inputRef.current?.focus() }} 
              >
                <CommandInput
                  inputMode="text"
                  value={inputContent}
                  onValueChange={(value) => handleInputChange(value, value)}
                  //onBlur={() => setIsFocused(false)} 
                  className={`${errTrigger && 'animate-input-error'} bg-light-white lg:min-w-[15rem] min-w-full lg:h-[3.5rem] h-[4.667rem] outline-none border border-gray/25 rounded-[0.5rem] lg:text-[1rem] text-[1.333rem] font-[400] text-dark-gray px-[1.5rem] lg:pt-[1rem] pt-[1.5rem]`}
                  ref={ inputRef }
                />

                  <motion.p
                    className="origin-top-left absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                    initial={{ scale: 1, y: '-50%' }}
                    animate={{
                      scale: isFocused || inputContent !== '' ? 0.7 : 1,
                      y: isFocused || inputContent !== '' ? '-80%' : '-50%'
                    }}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                  >
                    { placeholder }
                  </motion.p>

              </div>
              <img
                onClick={() => { setIsFocused(false); handleInputChange("", "")} }
                className="cursor-pointer transition-opacity duration-300 absolute top-[50%] -translate-y-[50%] right-0 mr-[1.5rem]" 
                style={{
                  opacity : inputContent === "" ? 0 : 1
                }}
                src="/icons/icon-close.svg" 
                alt="close" 
                draggable={false} 
              />
            </div>
          </PopoverTrigger>

          <PopoverContent className="lg:w-[15rem] w-[calc(100vw-2.10rem)] bg-light-white border border-gray/25 rounded-[0.5rem] py-[0.75rem]" onOpenAutoFocus={(e) => e.preventDefault()}>
            <CommandList>
              <CommandEmpty>{ t('comboboxNothingFound') }</CommandEmpty>
              <CommandGroup>
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
                {
                  options.map((option, index)=> (
                      <CommandItem key={index} onSelect={() => {handleInputChange(option.label[getLocale(locale)], option.value); setIsFocused(false)}} className=" hover:bg-gray/10 transition-colors duration-300 lg:text-[1rem] text-[1.333rem] rounded-[0.5rem] p-[0.5rem]">
                            { option.label[getLocale(locale)] }
                      </CommandItem>
                  ))
                }
              </CommandGroup>
            </CommandList>
          </PopoverContent>

        </Popover>
      </Command>

    </div>
  )
}

export default ComboBox