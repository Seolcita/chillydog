import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import styled from 'styled-components';
import { TestComponent } from '../components/TestComponent';

const inter = Inter({ subsets: ['latin'] });

const StyledContainer = styled.div`
  color: blue;
`;

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
