import styled from 'styled-components';
import { device } from '../../styles/Breakpoints';

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
`;

export const Contents = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem 2rem;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5rem;
  width: 100%;
  flex-grow: 1;

  @media ${device.xs} {
    padding: 0 0 0 4rem;
  }
`;
