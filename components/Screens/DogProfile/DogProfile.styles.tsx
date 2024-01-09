import styled from 'styled-components';
import { FlexCenter } from '../../common-styles';
import ColorMap from '../../../styles/Color';

export const Container = styled.div`
  // background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  padding: 0.7rem 2rem;
  background-color: ${ColorMap['grey'].extraLight}80;

  &:hover {
    background-color: ${ColorMap['grey'].extraLight};
  }
`;

export const Texts = styled.div`
  flex-grow: 1;
`;

export const EditIconButton = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  transition: color 0.4s ease-in-out;
  margin-left: 4rem;

  &:hover {
    border-radius: 50%;
    background-color: ${ColorMap['grey'].light};
  }

  &:active,
  &:focus {
    background-color: ${ColorMap['grey'].main};
    color: ${ColorMap['grey'].light};
  }
`;
