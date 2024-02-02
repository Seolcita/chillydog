import axios from 'axios';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { UserContextProvider } from '../context/user.context';
import { Header } from '../components/Header/Header';
import { GlobalStyles } from '../styles/Global';
import { theme } from '../styles/Theme';
import * as S from './_app.styled';

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Chilly Dog</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <GlobalStyles />
      <UserContextProvider>
        <S.Layout>
          <Header />
          <S.Container>
            <Component {...pageProps} />
          </S.Container>
          {/* <S.Footer>Footer</S.Footer> */}
        </S.Layout>
      </UserContextProvider>
    </ThemeProvider>
  );
}
