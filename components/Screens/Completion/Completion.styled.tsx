import styled from 'styled-components';
import {
  Center,
  FlexCenter,
  QuestionnaireFormContainer,
} from '../../common-styles';

export const Container = styled(Center)``;

export const Contents = styled(Center)`
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

export const Message = styled.div`
  text-align: center;
`;

export const CompleteImage = styled(Center)`
  & > iframe {
    border: none;
    width: 50%;
    height: 50%;
  }
`;
