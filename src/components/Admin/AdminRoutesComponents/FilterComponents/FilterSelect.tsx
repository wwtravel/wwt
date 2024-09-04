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

const FilterSelect = () => {

    const t = useTranslations("AdminRoutes")

  return (
    <Select>
      <SelectTrigger className={`relative font-open-sans text-[1rem] w-full lg:h-[3.5rem] h-[4.667rem] bg-light-white  md:rounded-[0.5rem] rounded-[0.667rem] border-gray/25 px-[1.5rem] py-0`}>
        <SelectValue placeholder={ t('default') } className="ring-0 text-[1rem] text-dark-gray font-open-sans font-[400]"/>
      </SelectTrigger>
      <SelectContent className="bg-light-white rounded-[0.5rem] border border-gray/25">
        <SelectGroup>
          <SelectItem className="text-[1rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer pl-[2rem]" value="default">
            <div className="">
                <p>{ t('default') }</p>
            </div>
          </SelectItem>

          <SelectItem className="text-[1rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="book-asc">
            <div className="flex gap-[0.5rem] items-center">
                <img src="/icons/admin-icons/icon-asc.svg" alt="ascendent" draggable={false} className="size-[1rem]" />
                <p>{ t('no-of-reservations-asc') }</p>
            </div>
          </SelectItem>

          <SelectItem className="text-[1rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="book-desc">
            <div className="flex gap-[0.5rem] items-center">
                <img src="/icons/admin-icons/icon-desc.svg" alt="ascendent" draggable={false} className="size-[1rem]" />
                <p>{ t('no-of-reservations-desc') }</p>
            </div>
          </SelectItem>

          <SelectItem className="text-[1rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="newest">
            <div className="flex gap-[0.5rem] items-center">
                <img src="/icons/admin-icons/icon-asc.svg" alt="ascendent" draggable={false} className="size-[1rem]" />
                <p>{ t('newest') }</p>
            </div>
          </SelectItem> 

          <SelectItem className="text-[1rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="oldest">
            <div className="flex gap-[0.5rem] items-center">
                <img src="/icons/admin-icons/icon-desc.svg" alt="ascendent" draggable={false} className="size-[1rem]" />
                <p>{ t('latest') }</p>
            </div>
          </SelectItem> 

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FilterSelect