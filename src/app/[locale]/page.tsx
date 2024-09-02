import { Destinations, Features, Footer, Header, NavBar, Services } from "@/components";
import { Metadata } from "next";

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params: {locale}} : {params: {locale: string}}) : Promise<Metadata> {
    const t = await getTranslations({locale, namespace: 'PageTitles'});

    return {
      title: t('home')
    };
  }

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Header />
      <Destinations />
      <Services />
      <Features />
      <Footer />
    </div>
  )
}