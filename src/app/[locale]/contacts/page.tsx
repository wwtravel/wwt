
import { Contacts, Footer, NavBar } from '@/components'
import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params: {locale}} : {params: {locale: string}}) : Promise<Metadata> {
    const t = await getTranslations({locale, namespace: 'PageTitles'});

    return {
      title: t('contact')
    };
  }

const page = () => {

  return (
    <div>
      <NavBar />
        <Contacts />
      <Footer />
    </div>
  )
}

export default page