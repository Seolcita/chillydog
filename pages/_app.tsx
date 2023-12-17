import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';

import { GlobalStyles } from '../styles/Global';
import { theme } from '../styles/Theme';
import * as S from './_app.styled';
import { Header } from '../components/Header/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SessionProvider session={pageProps.session}>
        <S.Layout>
          <Header />
          <S.Container>
            <Component {...pageProps} />
          </S.Container>
          <S.Footer>Footer</S.Footer>
        </S.Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}
