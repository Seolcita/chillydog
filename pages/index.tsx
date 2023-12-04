import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styled from 'styled-components';
import { TestComponent } from '../components/TestComponent';

const inter = Inter({ subsets: ['latin'] });

const StyledContainer = styled.div`
  background-color: skyblue;
  width: 100%;
`;

//TODO: It is placeholder. It will be replaced.
export default function Home() {
  return (
    <>
      <StyledContainer>
        Styled Components Test
        <TestComponent />
      </StyledContainer>
    </>
  );
}
