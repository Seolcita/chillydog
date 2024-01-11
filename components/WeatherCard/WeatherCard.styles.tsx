import styled from 'styled-components';
import { device } from '../../styles/Breakpoints';

export const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 15rem;
  padding: 2.5rem;
  background: rgb(110, 159, 255);
  background: linear-gradient(
    140deg,
    rgba(110, 159, 255, 1) 9%,
    rgba(48, 113, 251, 0.8351934523809523) 33%,
    rgba(0, 86, 147, 0.913624824929972) 84%
  );
  border-radius: 0.5rem;

  @media ${device.xs} {
    height: 18rem;
  }
`;

export const ImageContainer = styled.div`
  & > iframe {
    border: none;
    width: 13rem;
    height: 13rem;
  }

  @media ${device.xs} {
    margin-top: 0rem;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Temperature = styled.div`
  display: flex;
  align-items: end;
  margin: 1rem 0;
`;
