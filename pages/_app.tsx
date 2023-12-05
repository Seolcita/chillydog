import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../styles/Global';
import { theme } from '../styles/Theme';
import * as S from './_app.styled';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <S.Layout>
        <S.Nav>Navigation</S.Nav>
        <S.Container>
          <Component {...pageProps} />
        </S.Container>
        <S.Footer>Footer</S.Footer>
      </S.Layout>
    </ThemeProvider>
  );
}
