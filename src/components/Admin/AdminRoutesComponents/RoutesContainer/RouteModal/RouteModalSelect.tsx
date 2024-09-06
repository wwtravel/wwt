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
import { CoordinatePair } from "./RoutePatchModal";
import { useEffect, useState } from "react";


export const isSameCoordinatePair = (coord1: CoordinatePair | null, coord2: CoordinatePair): boolean => {
  return (
    coord1?.start.lat === coord2.start.lat &&
    coord1?.start.lon === coord2.start.lon &&
    coord1?.end.lat === coord2.end.lat &&
    coord1?.end.lon === coord2.end.lon
  );
};

interface RouteModalSelectProps{
    direction: CoordinatePair | null;
    setDirection: React.Dispatch<React.SetStateAction<CoordinatePair | null>>;
    tourCoord: CoordinatePair;
    returnCoord: CoordinatePair;
}

const RouteModalSelect:React.FC<RouteModalSelectProps> = ({ direction, setDirection, tourCoord, returnCoord }) => {

  const t = useTranslations("AdminRoutes")

  return (
    <Select value={ direction ? isSameCoordinatePair(direction, tourCoord) ? "tour" : "return" : '' } onValueChange={(value) => {
        if(value === 'tour') setDirection(tourCoord)
            else setDirection(returnCoord)
    }}>
      <SelectTrigger className={`relative font-open-sans xl:text-[1rem] text-[1.333rem] w-full xl:h-[3.5rem] h-[4rem] bg-light-white  md:rounded-[0.5rem] rounded-[0.667rem] border-gray/25 px-[1.5rem] py-0`}>
        <SelectValue placeholder={ t('choose-route') } className="ring-0 text-[1rem]  font-open-sans font-[400] text-gray/25"/>
      </SelectTrigger>

      <SelectContent className="bg-light-white rounded-[0.5rem] border border-gray/25 z-[50001]">
        <SelectGroup>
          <SelectItem className="xl:text-[1rem] text-[1.333rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="tour">
                <p>{ t('tour') }</p>
          </SelectItem>

          <SelectItem className="xl:text-[1rem] text-[1.333rem] text-dark-gray font-open-sans font-[400] py-[1rem] cursor-pointer" value="return">
                <p>{ t('return') }</p>
          </SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default RouteModalSelect