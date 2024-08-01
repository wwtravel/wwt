import { useTranslations } from "next-intl"
import ParcelForm from "./ParcelForm"

import ItineraryMap from "@/components/SharedComponents/ItineraryMap"
import { parcelCoordinates } from "@/constants/coordinates"


const ParcelInfo = () => {

  const t = useTranslations("Services")

  return (
    <div className='w-full rounded-[1rem] bg-light-white border border-[#DADBDD] overflow-hidden mt-[3rem] flex'>

        <div className="w-[50%] px-[4rem] py-[3rem]">
            <div className='flex items-end w-full'>
                <img src="/icons/passenger-info-icons/icon-weight.svg" alt="info-icon" draggable={false} className='size-[4rem] mr-[1.5rem]' />
                <p className='whitespace-nowrap  font-bold text-[1.5rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>1 KG</p>
                <span className='w-full overflow-hidden whitespace-nowrap text-ellipsis leading-[0.8] text-[1.5rem] mr-[0.5rem]'>.......................................................................................................................................................................................................</span>
                <p className='font-bold text-[2.5rem] text-dark-gray font-open-sans leading-[0.7] whitespace-nowrap'>2 CHF</p>
            </div>

            <p className="text-[1.125rem] text-dark-gray font-[500] mt-[1.5rem] font-open-sans">
                <span className="text-red font-[500]">*</span> { t('parcelInfoText1') } <br /> <br />
                <span className="text-red font-[500]">*</span> { t('parcelInfoText2') }
            </p>

            <ParcelForm />
        </div>

        <div className="w-[50%]">
          <ItineraryMap coordinates={parcelCoordinates} center={[parcelCoordinates[0].latitude, parcelCoordinates[0].longitude]}/>
        </div>

    </div>
  )
}

export default ParcelInfo