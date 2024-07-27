import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import '@/styles/globals.css'

import { Open_Sans, Montserrat } from 'next/font/google'

import { NavBar } from "@/components";


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
      <body>
        <NextIntlClientProvider messages={dictionary}>
          <NavBar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}