import styled, { css } from 'styled-components';

import { device } from '../../styles/Breakpoints';

export const headerHight = 7;
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${headerHight}rem;

  @media ${device.xs} {
    padding: 0 2rem;
  }

  @media ${device.sm} {
    padding: 0 4rem;
  }

  @media ${device.md} {
    padding: 0 8rem;
  }
`;
