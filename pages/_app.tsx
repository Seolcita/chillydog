import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../styles/Global';
import { theme } from '../styles/Theme';
import { Header } from '../components/Header/Header';
import { UserContextProvider } from '../context/user.context';
import * as S from './_app.styled';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <UserContextProvider>
        <S.Layout>
          <Header />
          <S.Container>
            <Component {...pageProps} />
          </S.Container>
          <S.Footer>Footer</S.Footer>
        </S.Layout>
      </UserContextProvider>
    </ThemeProvider>
  );
}
