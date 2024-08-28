import { AboutHeader, AboutFeatures, About, Testimonials, NavBar, Footer } from '@/components'
import React from 'react'

import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params: {locale}} : {params: {locale: string}}) : Promise<Metadata> {
    const t = await getTranslations({locale, namespace: 'PageTitles'});

    return {
      title: t('about')
    };
  }

const page = () => {
  return (
    <div>
      <NavBar />
      <AboutHeader />
      <About />
      <AboutFeatures />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default page