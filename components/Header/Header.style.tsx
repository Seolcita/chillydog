import styled, { css } from 'styled-components';
import { device } from '../../styles/Breakpoints';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7rem;
  padding: 0 4rem;

  @media ${device.xs} {
    padding: 0 2rem;
  }
`;
