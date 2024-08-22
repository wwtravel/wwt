import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import '@/styles/globals.css'
import 'leaflet/dist/leaflet.css';

import { Open_Sans, Montserrat } from 'next/font/google'

import { NavBar, Footer } from "@/components";

import {zeroRightClassName,fullWidthClassName, noScrollbarsClassName} from 'react-remove-scroll-bar';


const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
})


 
export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const dictionary = await getMessages();
 
  return (
    <html lang={locale} className={`${openSans.variable} ${montserrat.variable}`}>
      <head>
        <meta name="viewport" content="height=device-height, 
                        width=device-width, initial-scale=1.0, 
                        minimum-scale=1.0, maximum-scale=1.0, 
                        user-scalable=no, target-densitydpi=device-dpi"/>
      </head>
      <body className={`bg-[#F1F8FD] `}>
        <NextIntlClientProvider messages={dictionary}>
          <NavBar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}