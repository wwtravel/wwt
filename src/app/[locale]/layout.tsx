import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import '@/styles/globals.css'
import 'leaflet/dist/leaflet.css';
import '@/styles/animations.css'

import { Open_Sans, Montserrat } from 'next/font/google'

import { NavBar, Footer } from "@/components";

import Providers from '@/components/Providers';

import { Toaster } from "@/components/ui/sonner"
import Script from 'next/script';


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
          <Providers>
            
            {children}

            <Toaster />
          </Providers>
        </NextIntlClientProvider>

        <Script
          id="tawkto"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/66d5add7ea492f34bc0cbf89/1i6pau4mq';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}