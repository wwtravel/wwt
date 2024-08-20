
import { Contacts } from '@/components'
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
        <Contacts />
    </div>
  )
}

export default page