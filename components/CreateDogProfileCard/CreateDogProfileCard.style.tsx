import styled from 'styled-components';
import { FlexCenter } from '../common-styles';
import { headerHight } from '../Header/Header.style';

export const Wrap = styled(FlexCenter)``;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Contents = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;

  & > iframe {
    margin-top: -2rem;
    margin-bottom: 4rem;
    border: none;
    transform: scale(1.5);
  }
`;
