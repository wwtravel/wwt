import * as React from 'react';
import { Html, Tailwind, Img, Hr, Text, Section, Row, Heading, Head, Font, Button } from "@react-email/components";
import { WelcomeEmailProps } from '@/lib/types';

const langText = new Map([
    ["en", ["REGISTRATION SUCCESSFUL", "For more details, access the information below.", "ACCOUNT ACCESS DETAILS", "Login:", "Password:", "Buy tickets", "Sincerely, the team"]],
    ["ro", ["ÎNREGISTRARE CU SUCCES", "Pentru mai multe detalii, accesați informațiile de mai jos.", "DATELE DE ACCES ALE CONTULUI", "Autentificare:", "Parola:", "Cumpără bilete", "Cu stimă, echipa"]],
    ["fr", ["INSCRIPTION RÉUSSIE", "Pour plus de détails, accédez aux informations ci-dessous.", "DÉTAILS D'ACCÈS AU COMPTE", "Connexion:", "Mot de passe:", "Acheter des billets", "Cordialement, l'équipe"]],
    ["ru", ["РЕГИСТРАЦИЯ УСПЕШНА", "Для получения дополнительной информации, обратитесь к данным ниже.", "ДАННЫЕ ДЛЯ ДОСТУПА К УЧЕТНОЙ ЗАПИСИ", "Логин:", "Пароль:", "Купить билеты", "С уважением, команда"]]
])

export default function WelcomeEmail({details}: {details: WelcomeEmailProps}) {
    const lang = langText.get(details.lang);
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
                        url: "http://localhost:3000/fonts/Montserrat-VariableFont_wght.ttf",
                        format: "woff2",
                    }}
                />
            </Head>
            <Section className='bg-white'>
                <Section>
                    <Section className='bg-red h-4 mb-6'></Section>
                    <Img src="http://localhost:3000/images/logo.png" alt="logo" className='mx-auto h-6 mb-6' />
                    <Heading as="h2" className='font-bold text-2xl text-center text-black m-0 mb-2'>{lang !== undefined && lang[0]}</Heading>
                    <Text className='font-sans text-black text-center text-base m-0 mb-6'>{lang !== undefined && lang[1]}</Text>
                </Section>
                <Section className='bg-[#E8EEF3] py-12 px-16'>
                    <Section className='bg-white px-6 py-4 border border-[#DADBDD] rounded-lg max-w-[35rem]'>
                        <Text className='text-red font-bold text-sm m-0'>{lang !== undefined && lang[2]}</Text>
                        <Row >
                            <Text className='font-sans text-black text-base m-0 inline-block mr-2'>{lang !== undefined && lang[3]}</Text>
                            <Text className='font-sans text-black text-base m-0 font-bold inline-block'>{details.email}</Text>
                        </Row>
                        <Row >
                            <Text className='font-sans text-black text-base m-0 inline-block mr-2'>{lang !== undefined && lang[4]}</Text>
                            <Text className='font-sans text-black text-base m-0 font-bold inline-block mb-4'>{details.password}</Text>
                        </Row>
                        <Button href="#" className='font-sans text-white font-bold text-base m-0 bg-red py-3 px-6 rounded-[4px] mb-4'>{lang !== undefined && lang[5]}</Button>
                        <Hr className='m-0'></Hr>
                        <Row>
                            <Text className='font-sans text-black text-base m-0 inline-block mt-2 mr-1'>{lang !== undefined && lang[6]}</Text>
                            <Text className='font-sans text-black text-base m-0 inline-block mt-2 font-bold'>World Wide Travel</Text>
                        </Row>
                    </Section>
                </Section>
                <Section className='bg-red h-4 mt-6'></Section>
            </Section>
           
        </Tailwind>
        
    </Html>
  );
}
