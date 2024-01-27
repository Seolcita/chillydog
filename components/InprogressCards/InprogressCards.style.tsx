import styled from 'styled-components';
import { device } from '../../styles/Breakpoints';
import ColorMap from '../../styles/Color';

export interface ProgressBarProps {
  $isMobile: boolean;
}

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

  width: 100%;
  flex-grow: 1;

  @media ${device.xs} {
    padding: 0 0 0 4rem;
  }

  @media ${device.sm} {
    padding: 0 2rem 0 6rem;
  }
`;

export const ProgressBarValue = styled.span`
  color: transparent;
`;

export const ProgressBar = styled.progress<ProgressBarProps>`
  width: 85%;
  height: 2rem;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '2rem' : 'none')};
`;

const buttonColor = ColorMap['primary'].dark;
export const CompleteButton = styled.button`
  position: relative;
  background-color: ${buttonColor};
  color: ${ColorMap['white'].main};

  padding: 1rem 2rem;
  border: none;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    top: -0.5rem;
    left: -0.5rem;
    border-top: 0.2rem solid ${buttonColor};
    border-left: 0.2rem solid ${buttonColor};
    transition: all 0.25s;
  }

  &:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    bottom: -0.5rem;
    right: -0.5rem;
    border-bottom: 0.2rem solid ${buttonColor};
    border-right: 0.2rem solid ${buttonColor};
    transition: all 0.25s;
  }

  &:hover:before,
  &:hover:after,
  &:focus:before,
  &:focus:after {
    height: 100%;
    width: 100%;
  }

  @media ${device.xs} {
    margin: 0;
    width: 85%;
  }
`;
