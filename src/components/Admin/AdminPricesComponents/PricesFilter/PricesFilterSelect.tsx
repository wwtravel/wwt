import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useTranslations } from "next-intl";

interface PricesFilterSelectProps{
  setSortContition : React.Dispatch<React.SetStateAction<"priceAsc" | "priceDesc" | "none">>
  sortContition: "priceAsc" | "priceDesc" | "none";
}

const PricesFilterSelect: React.FC<PricesFilterSelectProps> = ({ setSortContition, sortContition }) => {

  const t = useTranslations("AdminPrices")

  return (
    <Select value={sortContition} onValueChange={(value: "priceAsc" | "priceDesc" | "none") => setSortContition(value)}>
      <SelectTrigger className={`relative font-open-sans xl:text-[1rem] text-[1.333rem] w-full xl:h-[3.5rem] h-[4.667rem] bg-light-white  xl:rounded-[0.5rem] rounded-[0.667rem] border-gray/25 px-[1.5rem] py-0`}>
        <SelectValue placeholder={ t('default') } className="ring-0 text-[1rem] text-dark-gray font-open-sans font-[400]"/>
      </SelectTrigger>
      <SelectContent className="bg-light-white rounded-[0.5rem] border border-gray/25">
        <SelectGroup>
          <SelectItem className="xl:text-[1rem] text-[1.333rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer pl-[2rem]" value="none">
            <div className="">
                <p>{ t('default') }</p>
            </div>
          </SelectItem>

          <SelectItem className="xl:text-[1rem] text-[1.333rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="priceAsc">
            <div className="flex gap-[0.5rem] items-center">
                <img src="/icons/admin-icons/icon-asc.svg" alt="ascendent" draggable={false} className="xl:size-[1rem] size-[1.333rem]" />
                <p>{ t('price-asc') }</p>
            </div>
          </SelectItem>

          <SelectItem className="xl:text-[1rem] text-[1.333rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="priceDesc">
            <div className="flex gap-[0.5rem] items-center">
                <img src="/icons/admin-icons/icon-desc.svg" alt="ascendent" draggable={false} className="xl:size-[1rem] size-[1.333rem]" />
                <p>{ t('price-desc') }</p>
            </div>
          </SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default PricesFilterSelect