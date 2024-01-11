import styled from 'styled-components';
import { device } from '../styles/Breakpoints';

export const Layout = styled.div`
  width: 100%;
  max-width: 144rem;
  display: flex;
  flex-direction: column;
  background-color: brown; //TODO: remove after development
  margin: auto;
`;

export const Container = styled.div`
  max-width: 144rem;
  width: 100%;
  background-color: pink; //TODO: remove after development
  display: flex;
  justify-content: center;
  padding: 0 4rem;
  min-height: 100vh;
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
