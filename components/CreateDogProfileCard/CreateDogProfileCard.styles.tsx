import styled from 'styled-components';
import { Center, FlexCenter } from '../common-styles';

export const Wrap = styled(FlexCenter)``;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Contents = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
`;

export const LottieContainer = styled(Center)`
  width: 100%;
  height: 100%;
  margin-top: -4rem;
  margin-bottom: 2rem;
  transform: scale(1.5);
`;
