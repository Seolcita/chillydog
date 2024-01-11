import styled from 'styled-components';
import { device } from '../../styles/Breakpoints';
import ColorMap from '../../styles/Color';

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
`;

export const Contents = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem 2rem;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5rem;
  width: 100%;
  flex-grow: 1;

  @media ${device.xs} {
    padding: 0 0 0 4rem;
  }

  @media ${device.sm} {
    padding: 0 2rem 0 4rem;
  }
`;

export const Span = styled.span`
  color: ${ColorMap['warning'].main};
`;

export const ProgressBar = styled.progress`
  width: 85%;
  margin: 1rem 0;
  height: 2rem;
`;

export const CompleteButton = styled.button`
  padding: 1rem 2rem;
  line-height: 2rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1.4rem;
  font-weight: 500;
  background-color: ${ColorMap['black'].main};
  color: ${ColorMap['white'].main};
  margin: 0 1rem;

  &:hover {
    background-color: ${ColorMap['grey'].dark};
  }

  &:focus,
  &:active {
    background-color: ${ColorMap['grey'].main};
  }

  @media ${device.xs} {
    margin: 0;
    width: 85%;
  }
`;
