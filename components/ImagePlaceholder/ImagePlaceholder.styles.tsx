import styled, { keyframes } from 'styled-components';
import ColorMap from '../../styles/Color';
import { ImagePlaceholderProps } from './ImagePlaceholder';

export interface StyledImagePlaceholderProps {
  width?: ImagePlaceholderProps['width'];
  height?: ImagePlaceholderProps['height'];
  $borderRadius?: ImagePlaceholderProps['borderRadius'];
}

const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

export const StyledImagePlaceholder = styled.div<StyledImagePlaceholderProps>`
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  height: ${({ height }) => (height ? `${height}rem` : '100%')};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? `${$borderRadius}rem` : '10rem'};
  background-color: ${ColorMap['grey'].extraLight};
  animation: ${shimmer} 2s ease-in-out infinite;
  background: linear-gradient(
    to right,
    ${ColorMap['grey'].extraLight} 8%,
    ${ColorMap['grey'].light}80 22%,
    ${ColorMap['grey'].extraLight} 33%
  );
  background-size: 200% 100%;
`;
