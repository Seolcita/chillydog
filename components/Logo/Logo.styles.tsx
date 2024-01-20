import styled from 'styled-components';

import ColorMap from '../../styles/Color';

interface LogoTextProps {
  $isMobile: boolean;
}

export const LogoText = styled.span<LogoTextProps>`
  margin-left: 1.5rem;
  font-size: ${({ $isMobile }) => ($isMobile ? '3rem' : '3.5rem')};
  color: ${ColorMap['white'].main};
`;
