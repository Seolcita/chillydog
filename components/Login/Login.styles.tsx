import styled from 'styled-components';
import ColorMap from '../../styles/Color';
import { device } from '../../styles/Breakpoints';
import { FlexCenter } from '../common-styles';

export const LoginContainer = styled(FlexCenter)``;

export const CardContents = styled(FlexCenter)`
  @media ${device.xs} {
    flex-direction: column;
  }
`;

export const LoginOptions = styled(FlexCenter)`
  flex-direction: column;
`;

export const LoginImage = styled(FlexCenter)`
  background-color: ${ColorMap['warning'].extraLight};

  & > iframe {
    border: none;
    width: 60%;
    height: 50%;
    margin-bottom: -2.5rem;
  }
`;
