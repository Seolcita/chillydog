import styled from 'styled-components';
import { device } from '../styles/Breakpoints';

export const Layout = styled.div`
  width: 100%;
  max-width: 144rem;
  display: flex;
  flex-direction: column;
  background-color: red; //TODO: remove after development
  margin: auto;
`;

export const Container = styled.div`
  max-width: 144rem;
  width: 100%;
  background-color: pink; //TODO: remove after development
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 0 2rem;

  @media ${device.xs} {
    max-width: 59.9rem;
  }

  @media ${device.sm} {
    max-width: 95.9rem;
  }

  @media ${device.md} {
    max-width: 150rem;
  }
`;

//TODO: It is placeholder. Remove this after creating Nav component
export const Nav = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: green;
`;

//TODO: It is placeholder. Remove this after creating Footer component
export const Footer = styled.div`
  background-color: yellow;
`;
