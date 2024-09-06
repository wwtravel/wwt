import { useTranslations } from 'next-intl'

const ContactPhones = () => {

  const t = useTranslations('ContactsPage')

  return (
    <div className='flex-1 text-center bg-light-white border border-gray/25 rounded-[0.5rem] pt-[1.5rem] md:pb-[3rem] pb-[1.5rem] shadow-custom font-open-sans'>
      <div className='px-[3rem]'>
        <img src="/icons/contacts-page-icons/icon-phone.svg" alt="phones" draggable={false} className='size-[4.5rem] mx-auto' />
        <h3 className='text-dark-gray font-bold text-[1.5rem] mt-[1rem]'>{ t('contactPhones') }</h3>

        <div className='text-dark-gray text-[1.125rem] mt-[1.5rem]'>
          <h4  className='font-bold'> { t('phoneMD') } </h4>
          <h4 >+373 60 262 525  +373 60 629 009</h4>

          <h4  className='font-bold mt-[1rem]'> { t('phoneSW') } </h4>
          <h4 >+41 762 333 452  +41 766 023 886</h4>

          <h4  className='font-bold mt-[1rem]'> { t('parcelDelivery') } </h4>
          <h4 >+373 68 213 292</h4>
        </div>

        <div className='flex justify-center gap-[1rem] mt-[1.5rem]'>
          <a href="https://wa.me/37360262525" target='_blank'>
            <button className='px-[1.5rem] h-[3.5rem] flex items-center gap-[0.375rem] bg-[#00D757] hover:bg-[#01AD46] transition-colors duration-300 rounded-[0.5rem] text-[1.125rem] text-light-white font-bold'>
              <img src="/icons/contacts-page-icons/icon-whatsapp.svg" alt="whatsapp" draggable={false} className='size-[1.5rem]' />
              <p>WhatsApp</p>
            </button>
          </a>
          <a href="viber://chat/?number=%2B37360262525">
            <button className='px-[1.5rem] h-[3.5rem] flex items-center gap-[0.375rem] bg-[#6841A4] hover:bg-[#543585] transition-colors duration-300 rounded-[0.5rem] text-[1.125rem] text-light-white font-bold'>
              <img src="/icons/contacts-page-icons/icon-viber.svg" alt="whatsapp" draggable={false} className='size-[1.5rem]' />
              <p>Viber</p>
            </button>
          </a>
        </div>
      </div>


    </div>
  )
}

export default ContactPhones