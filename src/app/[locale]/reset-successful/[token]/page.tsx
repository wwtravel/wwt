
import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import PageContent from './PageContent';

export async function generateMetadata({params: {locale}} : {params: {locale: string}}) : Promise<Metadata> {
    const t = await getTranslations({locale, namespace: 'PageTitles'});

    return {
      title: `${t('pass-reset')} | World Wide Travel`
    };
  }

const page = ({params}: {params: {token: string}}) => {

  return (
    <div>
      <PageContent token={ params.token }/>
    </div>
  )
}

export default page