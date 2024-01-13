import styled, { css } from 'styled-components';

import { device } from '../../styles/Breakpoints';

export const headerHight = 6;
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${headerHight}rem;
  padding: 0 4rem;

  @media ${device.xs} {
    padding: 0 2rem;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
