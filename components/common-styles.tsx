import styled from 'styled-components';

export interface VisibilityProps {
  $isVisible: boolean;
}

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
