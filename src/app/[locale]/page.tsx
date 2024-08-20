import { Destinations, Features, Header, Services } from "@/components";
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
      <Header />
      <Destinations />
      <Services />
      <Features />
    </div>
  )
}