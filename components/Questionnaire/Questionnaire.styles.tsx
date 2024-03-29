import styled from 'styled-components';
import { FlexCenter } from '../common-styles';
import { device } from '../../styles/Breakpoints';

export const Container = styled(FlexCenter)``;

export const Contents = styled.div`
  padding: 2rem;
  width: 100%;
  height: 100%;
  min-width: 30rem;
  margin-top: 1rem;

  @media ${device.xs} {
    padding: 0;
  }
`;
