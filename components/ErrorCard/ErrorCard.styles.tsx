import styled from 'styled-components';
import { Center, FlexCenter } from '../common-styles';

export const Wrap = styled(FlexCenter)`
  flex-direction: column;
`;

export const CardContainer = styled(Center)`
  flex-direction: column;
`;

export const Contents = styled(Center)`
  flex-direction: column;
  width: 100%;
  padding: 2rem;
`;

export const ImageBox = styled(Center)`
  & > iframe {
    border: none;
    width: 50%;
    height: 50%;
    transform: scale(1.2);
  }
`;
