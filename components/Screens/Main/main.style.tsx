import styled from 'styled-components';
import { device } from '../../../styles/Breakpoints';
import { FlexCenter } from '../../../components/common-styles';

export const Wrapper = styled(FlexCenter)`
  align-items: start;
  margin-top: 5rem;
`;

export const MainLayout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  @media ${device.xs} {
    max-width: 50rem;
  }

  @media ${device.sm} {
    min-width: 50rem;
    max-width: 60rem;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardsSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
`;

export const WeatherSection = styled.section`
  display: flex;
  margin-bottom: 2rem;
`;
