import styled from 'styled-components';

import { device } from '../../styles/Breakpoints';
import ColorMap from '../../styles/Color';
import { Center } from '../common-styles';

export const Container = styled(Center)`
  flex-direction: column;
  align-items: space-between;
  width: 55rem;
  @media ${device.xs} {
    width: 33rem;
    margin-top: 5rem;
  }
`;

export const CardContents = styled(Center)`
  flex-direction: row;
  height: 20rem;

  @media ${device.xs} {
    flex-direction: column;
    height: 40rem;
  }
`;

export const LoginOptions = styled(Center)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-right: 2rem;

  @media ${device.xs} {
    padding: 1rem 0 3rem;
    height: 25rem;
  }
`;

export const TextContainer = styled.div`
  margin-bottom: 2.5rem;
`;

export const LoginImage = styled(Center)`
  width: 100%;
  height: 100%;
  background-color: ${ColorMap['warning'].extraLight};
  border-radius: 0.5rem;

  & > iframe {
    border: none;
    width: 80%;
    height: 80%;
    margin-bottom: -2.5rem;
  }

  @media ${device.xs} {
    height: 30rem;
  }
`;
