import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['ro', 'ru', 'en', 'fr'];
 
export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`../dictionary/${locale}.json`)).default
  };
});