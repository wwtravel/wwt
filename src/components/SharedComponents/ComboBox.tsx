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
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

export type Option = Record<"value" | "label", string> & Record<string, string>

interface ComboBoxProps{
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const ComboBox:React.FC<ComboBoxProps> = ({ placeholder, options, value, onChange }) => {

  const t = useTranslations("Header")

  const inputRef = useRef<HTMLInputElement>(null)
  
  const [isFocused, setIsFocused] = useState(false)
  const [inputContent, setInputContent] = useState(value)

  const handleInputChange = (newValue: string) => {
    setInputContent(newValue)
    onChange(newValue)
  }

  useEffect(() => {
    setInputContent(value)
  }, [value])

  return (
    <div>
      <Command className="bg-[transparent]">
        <Popover open={isFocused} onOpenChange={setIsFocused}>
          <PopoverTrigger asChild onClick={(e) => { e.preventDefault() }}>
            <div className="relative">
              <div 
                className="relative"
                onClick={() => {setIsFocused(true); inputRef.current?.focus() }} 
              >
                <CommandInput
                  value={inputContent}
                  onValueChange={(value) => handleInputChange(value)}
                  onBlur={() => setIsFocused(false)} 
                  className="bg-light-white lg:min-w-[15rem] min-w-full lg:h-[3.5rem] h-[4.667rem] outline-none border border-gray/25 rounded-[0.5rem] lg:text-[1rem] text-[1.333rem] font-[400] text-dark-gray px-[1.5rem] lg:pt-[1rem] pt-[1.5rem]"
                  ref={ inputRef }
                />

                <div className="absolute origin-top-left h-full flex items-center left-[1.5rem] top-0 text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]">
                  <motion.p
                    className="origin-top-left "
                    initial={{ scale: 1, y: '0%' }}
                    animate={{
                      scale: isFocused || inputContent !== '' ? 0.7 : 1,
                      y: isFocused || inputContent !== '' ? '-30%' : '0%'
                    }}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                  >
                    { placeholder }
                  </motion.p>
                </div>

              </div>
              <img
                onClick={() => { setIsFocused(false); handleInputChange("")} }
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
                  options.map(option=> (
                      <CommandItem key={option.value} onSelect={() => handleInputChange(option.label)} className=" hover:bg-gray/10 transition-colors duration-300 lg:text-[1rem] text-[1.333rem] rounded-[0.5rem] p-[0.5rem]">
                            { option.label }
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