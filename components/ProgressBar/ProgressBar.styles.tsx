import styled from 'styled-components';
import { device } from '../../styles/Breakpoints';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  @media ${device.xs} {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
`;
