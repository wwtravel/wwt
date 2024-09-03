import {Pathnames, LocalePrefix} from 'next-intl/routing';

export const defaultLocale = 'en' as const;
export const locales = ['ro', 'ru', 'en', 'fr'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/about': {
    en: '/about-us',
    ro: '/despre-noi',
    ru: '/pro-kompaniyu',
    fr: '/a-propos'
  },
  '/contacts': {
    "en": '/contact',
    "ro": '/contacte',
    "ru": '/kontakty',
    "fr": '/contact'
  },
  '/route-search': {
    "en": '/route-search',
    "ro": '/cautare-traseu',
    "ru": '/poisk-marshruta',
    "fr": '/recherche-itineraire'
  },
  '/reset-successful/[token]': {
    "en": '/reset-successful/[token]',
    "ro": '/resetare-reusita/[token]',
    "ru": '/smena-parolya-uspeshna/[token]',
    "fr": '/reinitialisation-reussie/[token]'
  },
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';