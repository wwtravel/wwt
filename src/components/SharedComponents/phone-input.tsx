'use client'

import { motion } from "framer-motion";

import { CheckIcon, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import * as RPNInput from "react-phone-number-input";

import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input, InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {

      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value!)}
          {...props}
        />
      );
    },
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {

    const [isFocused, setIsFocused] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(props.value)

    React.useEffect(() => {
        setInputValue(props.value)
    }, [props.value])
    
    return (
    <div className="relative w-full">
        <Input
          className={cn("rounded-e-lg pl-[1.5rem] pt-[1rem] pb-0 rounded-s-none placeholder:text-[transparent] h-full border border-gray/25 font-open-sans text-dark-gray lg:text-[1rem] text-[1.125rem] bg-light-white", className)}
          {...props}
          ref={ref}
          id="phoneNumberInputCountry"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <motion.label 
            htmlFor="phoneNumberInputCountry" 
            className="origin-top-left absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400] cursor-text"
            initial={{ scale: 1, y: '-50%' }}
            animate={{
            scale: isFocused || inputValue !== '' ? 0.7 : 1,
            y: isFocused || inputValue !== '' ? '-80%' : '-50%'
            }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
        >
            { props.placeholder }
        </motion.label>
    </div>
  )},
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange],
  );

  const t = useTranslations("UserModal")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn("flex gap-1 rounded-e-none rounded-s-lg px-3 h-full border border-gray/25 bg-light-white")}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value}/>
          <ChevronsUpDown
            className={cn(
              "-mr-2 h-4 w-4 opacity-50 text-dark-gray",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-[1rem] border border-gray/25 bg-light-white shadow-custom text-[1rem] text-dark-gray font-open-sans rounded-[0.5rem]" align="start">
        <Command>
          <CommandList>
              <CommandInput placeholder={t('search-country')} className="text-[1rem] pl-[1rem] mb-[0.5rem]"/>
              <CommandEmpty className="text-[1rem] text-dark-gray font-open-sans text-center py-[2rem]">{ t('no-country-found') }</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className="gap-2 text-[1rem] text-dark-gray font-open-sans hover:bg-gray/15 transition-colors duration-300 p-[0.5rem]"
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className="flex-1 text-[1rem] text-dark-gray font-open-sans">{option.label}</span>
                      {option.value && (
                        <span className="text-[1rem] text-gray/75 font-open-sans">
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };