import styled from 'styled-components';
import { device } from '../../styles/Breakpoints';
import { FlexCenter } from '../../components/common-styles';

export const Wrapper = styled(FlexCenter)`
  align-items: start;
  margin-top: 10rem;
  width: 100%;
`;

export const MainLayout = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 70%;

  @media ${device.xs} {
    width: 100%;
    flex-direction: column-reverse;
  }

  @media ${device.sm} {
    width: 90%;
  }

  @media ${device.md} {
    width: 70%;
  }
`;

export const ResultSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const WeatherSection = styled.section`
  display: flex;
  padding-top: 7rem;

  @media ${device.xs} {
    padding-top: 0;
  }
`;
