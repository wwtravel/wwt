import * as React from 'react';
import { Html, Tailwind, Img, Hr, Text, Section, Row, Heading, Head, Font, Button } from "@react-email/components";
import { OrderConfirmationProps } from '@/lib/types';

const langText = new Map([
    ["en", ["REGISTRATION SUCCESSFUL", "For more details, access the information below.", "ACCOUNT ACCESS DETAILS", "Login:", "Password:", "Buy tickets", "Sincerely, the team"]],
    ["ro", ["REZERVARE CU SUCCES | ID: ", "Pentru mai multe detalii, accesați informațiile de mai jos.", "DATELE DE ACCES ALE CONTULUI", "Autentificare:", "Parola:", "Cumpără bilete", "Cu stimă, echipa"]],
    ["fr", ["INSCRIPTION RÉUSSIE", "Pour plus de détails, accédez aux informations ci-dessous.", "DÉTAILS D'ACCÈS AU COMPTE", "Connexion:", "Mot de passe:", "Acheter des billets", "Cordialement, l'équipe"]],
    ["ru", ["РЕГИСТРАЦИЯ УСПЕШНА", "Для получения дополнительной информации, обратитесь к данным ниже.", "ДАННЫЕ ДЛЯ ДОСТУПА К УЧЕТНОЙ ЗАПИСИ", "Логин:", "Пароль:", "Купить билеты", "С уважением, команда"]]
])

export default function WelcomeEmail() {
    // const lang = langText.get(details.lang);
  return (
    <Html lang="en">
        <Tailwind
            config={{
                theme: {
                extend: {
                    colors: {
                        red: "#ED1C24",
                        black: "#363739"
                    },
                },
                },
            }}
          >
            <Head>
                <Font
                    fontFamily="Montserrat"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://wwt-alpha.vercel.app/emails/fonts/Montserrat-VariableFont_wght.ttf",
                        format: "woff2",
                    }}
                />
            </Head>
            <Section className='bg-white'>
                 <Section>
                    <Section className='bg-red h-4 mb-6'></Section>
                    <Img src="https://wwt-alpha.vercel.app/emails/images/logo.png" alt="logo" className='mx-auto h-6 mb-6' />
                    <Heading as="h2" className='font-bold text-2xl text-center text-black m-0 mb-2'>Rezervare cu succes | ID: 560192</Heading>
                    <Text className='font-sans text-black text-center text-base m-0 mb-6'>Pentru mai multe detalii, accesați informațiile de mai jos.</Text>
                    <Img src="https://wwt-alpha.vercel.app/emails/images/bus.png" alt="logo" className='mx-auto h-[8.5rem] mb-6' />
                </Section>
                <Section className='bg-[#E8EEF3] py-12 px-16'>
                    <DateCard/>
                    <DateCard/>
                    <Section className='bg-white px-6 py-4 border border-[#DADBDD] rounded-lg max-w-[36rem]'>
                        <div className='flex justify-between mb-2'>
                            <Text className='text-red font-bold text-sm m-0 text-center'>DETALII PASAGERI</Text>
                            <Text className='text-red font-bold text-sm m-0 text-center'>PREȚ</Text>
                        </div>
                        <PassangerCard/>
                        <PassangerCard/>
                        <Hr className='my-2'></Hr>
                        <Text className='font-sans text-black text-center text-base m-0 mr-2 inline-block'>Persoana de contact:</Text>
                        <Text className='font-sans text-black text-center text-base m-0 inline-block font-bold'>Cătălin Țurcanu +37368550009</Text>
                    </Section>
                </Section>
                <Section className='bg-red h-4 mt-6'></Section>
            </Section>
           
        </Tailwind>
        
    </Html>
  );
}

const DateCard = () => {
    return (
        <Section className='bg-white px-6 py-4 border border-[#DADBDD] rounded-lg max-w-[36rem] mb-6'>
            <Text className='text-red font-bold text-sm m-0 text-center mb-2'>DATE PLECARE</Text>
            <Text className='text-black text-2xl m-0 font-bold text-center'>Sâmbătă - 03.08.24 - 11:30</Text>
            <Text className='font-sans text-black text-center text-base m-0'>Strada Calea Moşilor 2/1, Chișinău, Republica Moldova</Text>
        </Section>
    )
}

const PassangerCard = () => {
    return (
        <div className='mb-2 w-full flex justify-between'>
            <div className='gap-2 flex'>
                <Text className='font-sans text-black text-center text-base m-0'>1.</Text>
                <Text className='font-sans text-black text-center text-base m-0 font-bold'>CĂTĂLIN ȚURCANU</Text>
            </div>
            <Text className='font-sans text-black text-center text-base m-0 font-bold'>320 MDL</Text>
        </div>
    )
}