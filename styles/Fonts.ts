import { Roboto, Titillium_Web, Dancing_Script } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

export const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
});

export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: '400',
});
