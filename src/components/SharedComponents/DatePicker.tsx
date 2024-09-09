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

import { motion } from "framer-motion"

import { fr, ro, enUS, ru } from "date-fns/locale"
 
interface DatePickerProps{
    placeholder: string;
    setSearchDate: React.Dispatch<React.SetStateAction<string>>;
    edgeDate : Date | null;
    calName : string;
    dateValue : string;
    errTrigger: boolean;
}

const DatePicker:React.FC<DatePickerProps> = ({ placeholder, setSearchDate, edgeDate, calName, dateValue, errTrigger }) => {
  const [date, setDate] = React.useState<Date>()

  React.useEffect(() => {
    if(dateValue !== ''){
      setDate(new Date(dateValue))
    } else setDate(undefined)
  }, [dateValue])

  React.useEffect(() => {
    if(date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      setSearchDate(formattedDate)
      setOpenCal(false)
    } else {
      setSearchDate('')
    }
  }, [date])

  const [openCal, setOpenCal] = React.useState(false)

  const locale = useLocale()

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `${errTrigger && 'animate-input-error'} px-[1.5rem] pb-0 lg:pt-[1rem] pt-[1.5rem] relative lg:text-[1rem] text-[1.333rem] bg-light-white min-w-[15rem] max-lg:w-full lg:h-[3.5rem] h-[4.667rem] border border-gray/25 rounded-[0.5rem] justify-between text-left font-normal`,
            !date && "text-muted-foreground"
          )}
        >
          {date && format(date, "dd.MM.yyyy")}

            <div className="absolute origin-top-left h-full flex items-center left-[1.5rem] top-0 text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]">
              <motion.p
                className="origin-top-left "
                initial={{ scale: 1, y: '0%' }}
                animate={{
                  scale: date || openCal ? 0.7 : 1,
                  y: date || openCal ? '-30%' : '0%'
                }}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
              >
                { placeholder }
              </motion.p>
            </div>
          
          <CalendarIcon className="lg:size-[1rem] size-[1.333rem] absolute right-[1.5rem] top-[50%] -translate-y-[50%]" />
        </Button>
      </PopoverTrigger>
        <PopoverContent align="center" className="w-auto border border-gray/25 bg-light-white p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            locale={calLocale}
            disabled={ edgeDate && calName === 'arrival' ? (date) => date < edgeDate : (date) => date < today}
          />
        </PopoverContent>
    </Popover>
  )
}

export default DatePicker