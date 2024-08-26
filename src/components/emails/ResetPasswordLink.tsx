import * as React from 'react';
import { Html, Tailwind, Img, Hr, Text, Section, Row, Heading, Head, Font, Link } from "@react-email/components";
import { ResetPasswordProps } from '@/src/lib/types';

const langText = new Map([
    ["en", ["CHECK EMAIL", "For more details, access the information below.", "Please confirm your email address by clicking on the link:", "Check your email address", "If you have not made this request yourself, you can ignore this message.", "Sincerely, the team"]],
    ["ro", ["VERIFICARE EMAIL", "Pentru mai multe detalii, accesați informațiile de mai jos.", "Te rugăm să confirmi adresa ta de email făcând clic pe link:", "Verifică adresa ta de email", "Dacă nu dvs. ați făcut această cerere, puteți ignora acest mesaj.", "Cu stimă, echipa"]],
    ["fr", ["VERIFIER L'EMAIL", "Pour plus de détails, voir ci-dessous.", "Veuillez confirmer votre adresse électronique en cliquant sur le lien :", "Vérifiez votre adresse électronique", "Si vous n'avez pas fait cette demande vous-même, vous pouvez ignorer ce message.", "Cordialement, l'équipe"]],
    ["ru", ["ПРОВЕРИТЬ ЭЛЕКТРОННУЮ ПОЧТУ", "Более подробную информацию смотрите ниже.", "Пожалуйста, подтвердите свой адрес электронной почты, нажав на ссылку:", "Проверьте свой адрес электронной почты", "Если вы не делали этого запроса самостоятельно, можете проигнорировать это сообщение.", "С уважением, команда"]]
])

export default function ResetPasswordLink({details}: {details: ResetPasswordProps}) {
    const lang = langText.get(details.lang);
  return (
    <Html lang="en">
        <Tailwind
            config={{
                theme: {
                extend: {
                    colors: {
                        red: "#ED1C24",
                        black: "#363739",
                        blue: "#43A7BB"
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
                    <Heading as="h2" className='font-bold text-2xl text-center text-black m-0 mb-2'>{lang !== undefined && lang[0]}</Heading>
                    <Text className='font-sans text-black text-center text-base m-0 mb-6'>{lang !== undefined && lang[1]}</Text>
                </Section>
                <Section className='bg-[#E8EEF3] py-12 px-16'>
                    <Section className='bg-white px-6 py-4 border border-[#DADBDD] rounded-lg max-w-[35rem]'>
                        <Text className='font-sans text-black text-base m-0 inline-block mb-2'>{lang !== undefined && lang[2]}</Text>
                        <Link className='font-sans text-blue text-base m-0 inline-block font-bold mb-2' href={details.link} > {lang !== undefined && lang[3]}</Link>
                        <Text className='font-sans text-black text-base m-0 inline-block mb-4'>{lang !== undefined && lang[4]}</Text>
                        <Hr className='m-0'></Hr>
                        <Row>
                            <Text className='font-sans text-black text-base m-0 inline-block mt-2 mr-1'>{lang !== undefined && lang[5]}</Text>
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