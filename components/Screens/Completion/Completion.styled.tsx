import styled from 'styled-components';
import { FlexCenter, QuestionnaireFormContainer } from '../../common-styles';

export const Container = styled(FlexCenter)`
  height: 100vh;
`;

export const Contents = styled(QuestionnaireFormContainer)`
  height: 40rem;
  width: 100%;
  padding: 2rem;
`;

export const Message = styled.div`
  text-align: center;
`;

export const CompleteImage = styled(FlexCenter)`
  & > iframe {
    border: none;
    width: 100%;
    height: 100%;
  }
`;
