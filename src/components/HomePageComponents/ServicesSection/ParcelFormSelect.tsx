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
import { useTranslations } from "next-intl"

  export type Option = Record<"value" | "label", string> & Record<string, string>

    interface ParcelFormSelectProps{
        placeholder: string;
        options: Option[];
        onChange: (value: string) => void;
    }

const ParcelFormSelect:React.FC<ParcelFormSelectProps> = ({ placeholder, options, onChange }) => {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const t = useTranslations("Services")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:h-[3.5rem] h-[4.667rem] justify-between border border-gray/25 rounded-[0.5rem] sm:text-[1rem] text-[1.333rem]"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : (<p className="text-gray/75"> {placeholder} </p>)}
          <ChevronDown className="ml-2 sm:size-[1rem] size-[1.333rem] shrink-0 text-dark-gray" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15rem] bg-light-white border border-gray/25 rounded-[0.5rem] py-[0.5rem]">
        <Command>
          <CommandInput required placeholder={ t('selectBoxSearchPlaceholder') } className="bg-light-white w-full h-[3.5rem] outline-none sm:text-[1rem] text-[1.333rem] font-[400] text-dark-gray pl-[1rem] border-b border-gray/25 rounded-none mb-[0.5rem] py-[0.5rem]" />
          <CommandEmpty >{ t('selectBoxNothingFound') }</CommandEmpty>
          <CommandGroup className="max-h-[9.5rem] overflow-y-scroll">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
                className={`hover:bg-gray/10 transition-colors duration-300 sm:text-[1rem] text-[1.333rem] rounded-[0.5rem] p-[0.5rem] ${ value === option.value ? "bg-gray/10" : "" }`}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ParcelFormSelect