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
  height: 22rem;

  @media ${device.xs} {
    flex-direction: column;
    height: 47rem;
  }
`;

export const LoginOptions = styled(Center)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  padding-right: 3rem;

  @media ${device.xs} {
    padding: 1rem 0 3rem;
    height: 25rem;
  }
`;

export const TextContainer = styled.div`
  margin-bottom: 2.5rem;

  @media ${device.xs} {
    padding: 2rem 0 1rem;
  }
`;

export const LottieContainer = styled.div`
  width: 70%;
  height: 70%;
  margin-bottom: 2rem;
`;

export const LoginImage = styled(Center)`
  width: 100%;
  height: 100%;
  background-color: ${ColorMap['warning'].extraLight};
  border-radius: 0.5rem;

  @media ${device.xs} {
    height: 30rem;
  }
`;
