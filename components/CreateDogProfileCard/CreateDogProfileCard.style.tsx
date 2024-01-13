import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5rem;
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
