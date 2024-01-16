import styled from 'styled-components';
import { FlexCenter } from '../common-styles';

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrap = styled(FlexCenter)`
  flex-direction: column;
`;

export const CardContainer = styled(Center)``;

export const Contents = styled(Center)`
  width: 100%;
  padding: 2rem;
`;

export const ImageBox = styled(Center)`
  & > iframe {
    border: none;
    transform: scale(1.2);
  }
`;
