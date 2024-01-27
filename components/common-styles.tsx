import styled from 'styled-components';

import { headerHight } from './Header/Header.style';
import ColorMap, { Colors } from '../styles/Color';

export interface VisibilityProps {
  $isVisible: boolean;
}

export interface SpanProps {
  color?: Colors;
}

const height = `calc(100vh - ${headerHight}rem)`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexCenter = styled(Center)`
  height: ${height};
  width: 100%;
`;

export const QuestionnaireFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  justify-content: start;
`;

export const Visibility = styled.div<VisibilityProps>`
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
`;

export const Span = styled.span<SpanProps>`
  color: ${({ color }) =>
    color ? ColorMap[color].dark : ColorMap['error'].main};
`;
