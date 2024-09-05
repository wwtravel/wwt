'use client'

import { useLocale } from "next-intl"
import * as React from "react"
import { format, Locale, parse } from "date-fns"
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

interface FilterDatePickerProps{
  setDateCondition: React.Dispatch<React.SetStateAction<string>>;
}

const FilterDatePicker:React.FC<FilterDatePickerProps> = ({ setDateCondition }) => {

    const [date, setDate] = React.useState<Date | undefined>()

    React.useEffect(() => {
      if(date) {
        const formattedDate = format(date, "yyyy-MM-dd")
        setDateCondition(formattedDate)
      } else {
        setDateCondition('')
      }
    }, [date])

    const [openCal, setOpenCal] = React.useState(false)

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
    <Popover open={openCal} onOpenChange={setOpenCal}>
      <PopoverTrigger asChild className="p-0">
        <Button
          variant={"outline"}
          className={cn(
            "px-[1.5rem] pb-0 relative md:text-[1rem] text-[1.333rem] bg-light-white min-w-full lg:h-[3.5rem] h-[4rem] border border-gray/25 rounded-[0.5rem] justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "dd.MM.yyyy") : ( <span className="text-gray/75">dd.mm.yyyy</span> ) }
          <CalendarIcon className="lg:size-[1rem] size-[1.333rem] absolute right-[1.5rem] top-[50%] -translate-y-[50%]" />
        </Button>
      </PopoverTrigger>
        <PopoverContent align="center" className="w-auto border border-gray/25 bg-light-white p-0 z-[50000]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            locale={calLocale}
            captionLayout="dropdown-buttons"
            fromYear={1960}
            toYear={2030}
          />
        </PopoverContent>
    </Popover>
  )
}

export default FilterDatePicker