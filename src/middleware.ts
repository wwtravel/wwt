import createMiddleware from 'next-intl/middleware';
import {localePrefix, defaultLocale, locales, pathnames} from './config';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames
});

export const config = {
  matcher: [
    '/', // The root path
    '/(ro|ru|en|fr)/:path*', // Locale-prefixed paths
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};