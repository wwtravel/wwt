import * as React from 'react';
import { Html, Tailwind, Img, Hr, Text, Section, Row, Heading, Head, Font, Button, Link } from "@react-email/components";
import { OrderConfirmationProps, Passanger } from '@/lib/types';

const langText = new Map([
    ["en", [
        "SUCCESSFUL BOOKING | ID: ",
        "For more details, please check the information below.",
        "DEPARTURE DATE",
        "ARRIVAL DATE",
        "PASSENGER DETAILS", 
        "PRICE",
        "Contact person:", 
        "Payment upon boarding - Bus with the inscription 'WORLD WIDE TRAVEL'", 
        "Departure time and location:", 
        "You need to arrive at the departure location at least 20 minutes before departure. The vehicle departs according to the local time of the departure city.",
        "Requirements for international travel:",
        "Check visa requirements carefully for destination and transit.",
        "Make sure all your documents (passport, visas) are valid and in order.",
        "The passenger is responsible for personal documents and visa regulations.",
        "If the passenger cannot travel due to invalid documents, the fare is non-refundable.",
        "Contact details:",
        "Call us:",
        "Email us:",
        "Section",
        "on the website",
        "We wish you a pleasant trip!"
    ]],
    ["ro", [
        "REZERVARE CU SUCCES | ID: ",
        "Pentru mai multe detalii, accesați informațiile de mai jos.",
        "DATA PLECĂRII",
        "DATA SOSIRII",
        "DETALII PASAGERI", 
        "PREȚ",
        "Persoana de contact:", 
        "Achitarea la îmbarcare - Autocar cu inscripția 'WORLD WIDE TRAVEL'", 
        "Ora și locul de plecare:", 
        "Trebuie să ajungeți la locul de plecare cu cel puțin 20 de minute înainte de plecare. Vehiculul pleacă conform orei locale a orașului de plecare.",
        "Cerințe pentru călătoriile internaționale:",
        "Verificați cu atenție cerințele de viză pentru destinație și tranzit.",
        "Asigurați-vă că toate documentele dvs. (pașaport, vize) sunt valabile și în regulă.",
        "Pasagerul este responsabil pentru documentele personale și reglementărilor de viză.",
        "Dacă pasagerul nu poate călători conform orarului din cauza documentelor nevalabile, tariful nu este rambursabil.",
        "Detalii de contact:",
        "Telefonează-ne:",
        "Scrie-ne un email:",
        "Secțiunea",
        "de pe website",
        "Vă dorim o călătorie plăcută!"
    ]],
    ["fr", [
        "RÉSERVATION RÉUSSIE | ID: ",
        "Pour plus de détails, consultez les informations ci-dessous.",
        "DATE DE DÉPART",
        "DATE D'ARRIVÉE",
        "DÉTAILS DU PASSAGER", 
        "PRIX",
        "Personne de contact:", 
        "Paiement à l'embarquement - Bus avec l'inscription 'WORLD WIDE TRAVEL'", 
        "Heure et lieu de départ:", 
        "Vous devez arriver à l'emplacement de départ au moins 20 minutes avant le départ. Le véhicule part selon l'heure locale de la ville de départ.",
        "Exigences pour les voyages internationaux:",
        "Vérifiez attentivement les exigences en matière de visa pour la destination et le transit.",
        "Assurez-vous que tous vos documents (passeport, visas) sont valides et en ordre.",
        "Le passager est responsable des documents personnels et des règlements de visa.",
        "Si le passager ne peut pas voyager en raison de documents invalides, le tarif n'est pas remboursable.",
        "Détails de contact:",
        "Appelez-nous:",
        "Envoyez-nous un email:",
        "Section",
        "sur le site",
        "Nous vous souhaitons un agréable voyage!"
    ]],
    ["ru", [
        "УСПЕШНОЕ БРОНИРОВАНИЕ | ID: ",
        "Более подробную информацию вы найдете ниже.",
        "ДАТА ВЫЕЗДА",
        "ДАТА ПРИБЫТИЯ",
        "СВЕДЕНИЯ О ПАССАЖИРАХ", 
        "ЦЕНА",
        "Контактное лицо:", 
        "Оплата при посадке - Автобус с надписью 'WORLD WIDE TRAVEL'", 
        "Время и место отправления:", 
        "Необходимо прибыть на место отправления как минимум за 20 минут до отправления. Транспортное средство отправляется согласно местному времени города отправления.",
        "Требования для международных поездок:",
        "Внимательно проверьте визовые требования для пункта назначения и транзита.",
        "Убедитесь, что все ваши документы (паспорт, визы) действительны и в порядке.",
        "Пассажир несет ответственность за личные документы и визовые правила.",
        "Если пассажир не может отправиться в поездку из-за недействительных документов, стоимость билета не возвращается.",
        "Контактные данные:",
        "Позвоните нам:",
        "Напишите нам на email:",
        "Раздел",
        "на сайте",
        "Желаем вам приятного путешествия!"
    ]]
]);

export default function OrderConfirmation({details}: {details: OrderConfirmationProps}) {
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
                        url: "https://wwt-alpha.vercel.app/emails/fonts/Montserrat-VariableFont_wght.ttf",
                        format: "woff2",
                    }}
                />
            </Head>
            <Section className='bg-white'>
                 <Section>
                    <Section className='bg-red h-4 mb-6'></Section>
                    <Img src="https://wwt-alpha.vercel.app/emails/images/logo.png" alt="logo" className='mx-auto h-6 mb-6' />
                    <Heading as="h2" className='font-bold text-2xl text-center text-black m-0 mb-2'>{lang !== undefined && lang[0]} {details.id}</Heading>
                    <Text className='font-sans text-black text-center text-base m-0 mb-6'>{lang !== undefined && lang[1]}</Text>
                    <Img src="https://wwt-alpha.vercel.app/emails/images/bus.png" alt="logo" className='mx-auto h-[8.5rem] mb-6' />
                </Section>
                <Section className='bg-[#E8EEF3] py-12 px-16'>
                    <DateCard title={lang !== undefined && lang[2]} date={details.departureDate} address={details.departureAdress}/>
                    <DateCard title={lang !== undefined && lang[3]} date={details.arrivalDate} address={details.arrivalAdress}/>
                    <Section className='bg-white px-6 py-4 border border-[#DADBDD] rounded-lg max-w-[36rem]'>
                        <table className='mb-2 w-full'>
                            <tbody>
                                <tr>
                                    <th><Text className='text-red font-bold text-sm m-0 text-left'>{lang !== undefined && lang[4]}</Text></th>
                                    <th><Text className='text-red font-bold text-sm m-0 text-right'>{lang !== undefined && lang[5]}</Text></th>
                                </tr>
                                {
                                    details.passangers.map((passanger, index) => (
                                        <PassangerCard passanger={passanger} key={passanger.firstname + index}/>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Hr className='my-2'></Hr>
                        <Text className='font-sans text-black text-center text-base m-0 mr-2 inline-block'>{lang !== undefined && lang[6]}</Text>
                        <Text className='font-sans text-black text-center text-base m-0 inline-block font-bold'>{details.contactDetails.name + " " + details.contactDetails.phone_number}</Text>
                    </Section>
                </Section>

                <Section className='mt-6 max-w-[36rem] mx-auto'>
                    <Text className='font-sans text-black text-sm mb-4 font-bold'>{lang !== undefined && lang[7]}</Text>
                    <Text className='font-sans text-black text-sm m-0 font-bold'>{lang !== undefined && lang[8]}</Text>
                    <Text className='font-sans text-black text-sm mb-4'>{lang !== undefined && lang[9]}</Text>
                    <Text className='font-sans text-black text-sm m-0 font-bold'>{lang !== undefined && lang[10]}</Text>
                    <Text className='font-sans text-black text-sm mb-4'>{lang !== undefined && lang[11]} <br/> {lang !== undefined && lang[12]} <br/> {lang !== undefined && lang[13]} <br/> {lang !== undefined && lang[14]}</Text>
                    <Text className='font-sans text-black text-sm mb-4 font-bold'>{lang !== undefined && lang[15]}</Text>
                    <Text className='font-sans text-black text-sm mb-4'>{lang !== undefined && lang[16]} <br/> MD +373 60 262 525 | +373 60 262 525 <br/> CHF +41 762 333 452 | +41 766 023 886</Text>
                    <Text className='font-sans text-black text-sm mb-4'>{lang !== undefined && lang[17]} <br/> help@wwtravel.md <br/> <br/> {lang !== undefined && lang[18]} <Link href={`https://wwt-alpha.vercel.app/${details.lang}/contact`}>FAQ</Link> {lang !== undefined && lang[19]}</Text>
                    <Text className='font-sans text-black text-sm font-bold'>{lang !== undefined && lang[20]}</Text>
                </Section>

                <Section className='bg-red h-4 mt-6'></Section>
            </Section>
        </Tailwind>
        
    </Html>
  );
}

const DateCard = ({title, date, address}: {title: string | false, date: string, address: string}) => {
    return (
        <Section className='bg-white px-6 py-4 border border-[#DADBDD] rounded-lg max-w-[36rem] mb-6'>
            <Text className='text-red font-bold text-sm m-0 text-center mb-2'>{title}</Text>
            <Text className='text-black text-2xl m-0 font-bold text-center'>{date}</Text>
            <Text className='font-sans text-black text-center text-base m-0'>{address}</Text>
        </Section>
    )
}

const PassangerCard = ({passanger}: {passanger: Passanger}) => {
    return (
        <tr>
            <td className='text-left'>
                <div className='flex'>
                        <Text className='font-sans text-black text-center text-base m-0 mr-2'>1.</Text>
                        <Text className='font-sans text-black text-center text-base m-0 font-bold'>{`${passanger.firstname} ${passanger.lastname}`}</Text>
                </div>
            </td>
            <td className='text-right'>
                <Text className='font-sans text-black text-base m-0 font-bold'>{passanger.price.value + " " + passanger.price.currency}</Text>
            </td>
        </tr>
    )
}