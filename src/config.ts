import {Pathnames, LocalePrefix} from 'next-intl/routing';

export const defaultLocale = 'en' as const;
export const locales = ['ro', 'ru', 'en', 'fr'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/about': {
    en: '/about-us',
    ro: '/despre-noi',
    ru: '/o-nas',
    fr: '/a-propos'
  }
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';