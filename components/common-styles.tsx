import styled from 'styled-components';
import { headerHight } from './Header/Header.style';

export interface VisibilityProps {
  $isVisible: boolean;
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
