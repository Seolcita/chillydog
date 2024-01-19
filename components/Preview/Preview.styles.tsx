import styled from 'styled-components';
import { device } from '../../styles/Breakpoints';
import { Center, FlexCenter } from '../common-styles';

export const Container = styled(Center)`
  flex-direction: column;
  width: 100%;
  height: 30rem;
  margin-top: 3rem;

  @media ${device.xs} {
    height: 33rem;
  }
`;

export const CardContents = styled(Center)`
  flex-direction: row;

  @media ${device.xs} {
    flex-direction: column;
  }
`;

export const PreviewImage = styled(FlexCenter)``;
