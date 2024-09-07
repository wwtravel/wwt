import { useTranslations } from "next-intl"
import ParcelForm from "./ParcelForm"

import { parcelCoordinates } from "@/constants/coordinates"
import ParcelInfoPrice from "./ParcelInfoPrice"

import dynamic from 'next/dynamic';

const ItineraryMap = dynamic(() => import('../../SharedComponents/ItineraryMap'), {
  ssr: false
});

const ParcelInfo = () => {

  const t = useTranslations("Services")

  return (
    <div className='max-w-[81rem] w-full mx-auto rounded-[1rem] bg-light-white border border-[#DADBDD] overflow-hidden mt-[3rem] flex lg:flex-row flex-col shadow-custom'>

        <div className="lg:w-[50%] w-full md:px-[4rem] md:py-[3rem] xs:p-[2rem] p-[1rem]">
            <div className='flex items-end w-full justify-between'>
                <div className="flex items-end">
                  <img src="/icons/passenger-info-icons/icon-weight.svg" alt="info-icon" draggable={false} className='md:size-[4rem] size-[2.667rem] md:mr-[1.5rem] mr-[0.667rem]' />
                  <p className='whitespace-nowrap  font-bold md:text-[1.5rem] text-[1.333rem] text-dark-gray font-open-sans leading-[0.7] mr-[0.5rem]'>{ t("parcels") } <span className="font-[400]">- { t('parcels-desc') }</span></p>
                </div>
                <ParcelInfoPrice />
            </div>

            <p className="md:text-[1.125rem] text-[1.167rem] text-dark-gray font-[500] md:mt-[1.5rem] mt-[1.333rem] font-open-sans">
                <span className="text-red font-[500]">*</span> { t('parcelInfoText1') } <br /> <br />
                <span className="text-red font-[500]">*</span> { t('parcelInfoText2') }
            </p>

            <ParcelForm />
        </div>

        <div className="lg:w-[50%] max-lg:w-full max-lg:h-[26rem]">
          <ItineraryMap coordinates={parcelCoordinates} center={[parcelCoordinates[1].latitude, parcelCoordinates[1].longitude]}/>
        </div>

    </div>
  )
}

export default ParcelInfo