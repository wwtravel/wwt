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


import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export type Option = Record<"value" | "label", string> & Record<string, string>

interface ComboBoxProps{
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const ComboBox:React.FC<ComboBoxProps> = ({ placeholder, options, value, onChange }) => {

  const t = useTranslations("Header")
  
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
      <Command>
        <Popover open={isFocused} onOpenChange={setIsFocused}>
          <PopoverTrigger asChild onClick={(e) => { e.preventDefault() }}>
            <div className="relative">
              <CommandInput
                value={inputContent}
                onValueChange={(value) => handleInputChange(value)}
                onClick={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
                className="bg-light-white w-[15rem] h-[3.5rem] outline-none border border-gray/25 rounded-[0.5rem] text-[1rem] font-[400] text-dark-gray px-[1.5rem]" 
                placeholder={placeholder}
              />
              <img
                onClick={() => { setIsFocused(false); handleInputChange("")} }
                className="cursor-pointer absolute top-[50%] -translate-y-[50%] right-0 mr-[1.5rem]" 
                src="/icons/icon-close.svg" 
                alt="close" 
                draggable={false} 
              />
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-[15rem] bg-light-white border border-gray/25 rounded-[0.5rem] py-[0.75rem]" onOpenAutoFocus={(e) => e.preventDefault()}>
            <CommandList>
              <CommandEmpty>{ t('comboboxNothingFound') }</CommandEmpty>
              <CommandGroup>
                {
                  options.map(option=> (
                      <CommandItem key={option.value} onSelect={() => handleInputChange(option.label)} className=" hover:bg-gray/10 transition-colors duration-300 text-[1rem] rounded-[0.5rem] p-[0.5rem]">
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