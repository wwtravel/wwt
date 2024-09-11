import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import '@/styles/globals.css'
import 'leaflet/dist/leaflet.css';
import '@/styles/animations.css'

import { Open_Sans, Montserrat } from 'next/font/google'

import Providers from '@/components/Providers';

import { Toaster } from "@/components/ui/sonner"
import Head from 'next/head';


export const metadata = {
  description: 'Fiecare călătorie este o experiență unică, plină de confort și siguranță, având destinații în Elveția, Austria, Germania și Franța.',
  openGraph: {
    type: 'website',
    url: 'https://www.worldwidetravel.md/ro',
    title: 'World Wide Travel - Pagina Principală',
    description: 'Fiecare călătorie este o experiență unică, plină de confort și siguranță, având destinații în Elveția, Austria, Germania și Franța.',
    images: [
      {
        url: '/images/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'World Wide Travel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://www.worldwidetravel.md/ro',
    title: 'World Wide Travel - Pagina Principală',
    description: 'Fiecare călătorie este o experiență unică, plină de confort și siguranță, având destinații în Elveția, Austria, Germania și Franța.',
    image: '/images/opengraph.png',
  },
};


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
      <Head>
        <meta name="viewport" content="height=device-height, 
                        width=device-width, initial-scale=1.0, 
                        minimum-scale=1.0, maximum-scale=1.0, 
                        user-scalable=no, target-densitydpi=device-dpi"/>
        <link
          rel="preload"
          href="/images/header_bg.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/images/footer-bg.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/images/aboutPage/about-header-bg.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/images/aboutPage/about-features-bg.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/images/dotted-map-bg.png"
          as="image"
          type="image/png"
        />
      </Head>


      <body className={`bg-[#F1F8FD] `}>
        <NextIntlClientProvider messages={dictionary}>
          <Providers>
            
            {children}

          </Providers>
        </NextIntlClientProvider>
        
        <Toaster duration={3000}/>

      </body>
    </html>
  );
}