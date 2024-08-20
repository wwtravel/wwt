import { useTranslations } from "next-intl"


interface SignUpProps{
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    setModalContent : React.Dispatch<React.SetStateAction<"LogIn" | "SignUp" | "EmailSent">>
}

const SignUp:React.FC<SignUpProps> = ({ setIsOpen, setModalContent }) => {

  const t = useTranslations('SignUpModal')

  return (
    <div className='py-[4rem] px-[3rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('createAccTitle') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>
        <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[1rem]'>{ t('message') }</p>

        <form className='mt-[2rem] w-full'>
            <input className='w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400]' required type="text" placeholder={ t('last-name') }/>
            <input className='w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] mt-[1rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400]' required type="text" placeholder={ t('first-name') }/>
            <input className='w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] mt-[1rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400]' required type="email" placeholder={ t('email') }/>

            <input type="submit" value={ t('sign-up') } className='bg-red w-full h-[3.5rem] rounded-[0.5rem] text-light-white text-[1.125rem] font-bold font-open-sans mt-[2rem] cursor-pointer'/>
        </form>

        <p className='font-open-sans text-gray text-[1.125rem] font-[400] text-center mt-[2rem]'><span className='text-dark-gray'>{ t('question') }</span> <span onClick={() => setModalContent('LogIn')} className='cursor-pointer underline'>{ t('log-in') }</span></p>
    </div>
  )
}

export default SignUp