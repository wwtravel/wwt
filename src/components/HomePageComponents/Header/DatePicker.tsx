"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import { format, Locale } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { fr, ro, enUS, ru } from "date-fns/locale"
 
interface DatePickerProps{
    placeholder: string;
}

const DatePicker:React.FC<DatePickerProps> = ({ placeholder }) => {
  const [date, setDate] = React.useState<Date>()

  const locale = useLocale()

  let calLocale : Locale;
  switch(locale){
    case 'ro' : calLocale = ro; break;
    case 'en' : calLocale = enUS; break;
    case 'ru' : calLocale = ru; break;
    case 'fr' : calLocale = fr; break;
    default : calLocale = enUS; break;
  }
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "p-[1.5rem] lg:text-[1rem] text-[1.333rem] bg-light-white min-w-[15rem] lg:h-[3.5rem] h-[4.667rem] border border-gray/25 rounded-[0.5rem] justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "MM.dd.yyyy") : <span className="text-gray/75 lg:text-[1rem] text-[1.333rem]">{ placeholder }</span>}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
        <PopoverContent align="center" className="w-auto border border-gray/25 bg-light-white p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            locale={calLocale}
          />
        </PopoverContent>
    </Popover>
  )
}

export default DatePicker