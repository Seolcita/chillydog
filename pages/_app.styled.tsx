import styled from 'styled-components';
import { device } from '../styles/Breakpoints';
import { headerHight } from '../components/Header/Header.style';

export const Layout = styled.div`
  width: 100%;
  max-width: 144rem;
  display: flex;
  flex-direction: column;
  background-color: brown; //TODO: remove after development
  margin: auto;
`;

const bodyHeight = `calc(100vh - ${headerHight}rem)`;

export const Container = styled.div`
  max-width: 144rem;
  width: 100%;
  background-color: pink; //TODO: remove after development
  display: flex;
  justify-content: center;
  padding: 0 4rem;
  min-height: ${bodyHeight};
  max-height: 200vh;
  overflow: visible;

  @media ${device.xs} {
    max-width: 599px;
    padding: 0 2rem;
  }

  @media ${device.sm} {
    max-width: 960px;
  }

  @media ${device.md} {
    max-width: 1500px;
  }
`;

//TODO: It is placeholder. Remove this after creating Footer component
export const Footer = styled.div`
  background-color: yellow;
`;
