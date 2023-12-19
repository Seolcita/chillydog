import styled from 'styled-components';
import ColorMap from '../../../styles/Color';

type InputProps = {
  $error?: boolean | '';
};

type ErrorTextProps = {
  $isVisible: boolean;
};

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 5rem;
  margin: 0.3rem 0;
  border: ${({ $error }) =>
    `${$error ? '0.3rem' : '0.2rem'} solid ${
      ColorMap[$error ? 'error' : 'grey'].light
    }`};
  border-radius: 0.5rem;
  padding: 1.5rem;
  font-size: 2rem;
  letter-spacing: 0.04rem;

  &:focus {
    border: 0.3rem solid ${ColorMap['black'].main};
    outline: none;
  }
`;

export const ErrorText = styled.div<ErrorTextProps>`
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  margin-top: 0.5rem;
  :first-child {
    margin-right: 0.5rem;
  }
`;
