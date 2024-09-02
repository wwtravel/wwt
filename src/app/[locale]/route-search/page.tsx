
import React from 'react'

import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import PageContent from './PageContent';

export async function generateMetadata({params: {locale}} : {params: {locale: string}}) : Promise<Metadata> {
    const t = await getTranslations({locale, namespace: 'PageTitles'});

    return {
      title: t('route-search')
    };
  }

const page = () => {
  return <PageContent />
}

export default page