import styled from 'styled-components';

import { headerHight } from '../components/Header/Header.style';
import { device } from '../styles/Breakpoints';
import ColorMap from '../styles/Color';

export const Layout = styled.div`
  width: 100%;
  max-width: 144rem;
  display: flex;
  flex-direction: column;
  background-color: ${ColorMap['grey'].dark};
  margin: auto;
`;

const bodyHeight = `calc(100vh - ${headerHight}rem)`;

export const Container = styled.div`
  display: relative;
  max-width: 144rem;
  width: 100%;
  // background-color: ${ColorMap['grey'].extraLight};
  background-color: ${ColorMap['grey'].dark};
  display: flex;
  justify-content: center;
  padding: 0 4rem;
  min-height: ${bodyHeight};
  max-height: 1000vh;
  overflow: visible;
  background-image: url('/images/background/bg.png');
  background-repeat: repeat;

  @media ${device.xs} {
    max-width: 599px;
    padding: 0 2rem;
    background-size: 0;
  }

  @media ${device.sm} {
    max-width: 960px;
    background-size: 0;
  }

  @media ${device.md} {
    max-width: 1500px;
    background-size: 100%;
  }
`;

//TODO: It is placeholder. Remove this after creating Footer component
export const Footer = styled.div`
  background-color: yellow;
`;
