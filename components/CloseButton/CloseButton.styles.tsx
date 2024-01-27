import styled from 'styled-components';
import ColorMap from '../../styles/Color';

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2rem;
  right: 2rem;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  transition: background-color 0.2s ease-in-out;
  z-index: 1;

  &:hover {
    background-color: ${ColorMap['grey'].extraLight};
  }

  &:active {
    background-color: ${ColorMap['grey'].light}80;
  }
`;
