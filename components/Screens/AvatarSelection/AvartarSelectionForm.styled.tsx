import styled from 'styled-components';
import ColorMap from '../../../styles/Color';
import { FlexCenter } from '../../common-styles';

type AvatarBoxProps = {
  $highlighted: boolean;
};

export const AvatarsContainer = styled(FlexCenter)`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

export const AvatarsButton = styled.div`
  padding: 0;
  border: none;
`;

export const AvatarBox = styled(FlexCenter)<AvatarBoxProps>`
  width: 10.6rem;
  height: 10.6rem;
  background-color: white;
  border-radius: 10rem;
  margin: 1rem;
  position: relative;
  cursor: pointer;
  background-color: ${({ $highlighted }) =>
    $highlighted ? `${ColorMap['grey'].light}80` : 'transparent'};
  user-drag: none;

  &:before {
    content: '';
    position: absolute;
    top: 0%;
    bottom: 0%;
    height: 100%;
    width: 100%;
    border-radius: 10rem;
    background-color: ${ColorMap['grey'].extraLight};
    transform: scale(0);
  }

  &:hover:before {
    transform: scale(1);
    transition: transform 0.5s ease;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.75);
    }

    70% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.75);
    }
  }

  &:active:before,
  &:focus:before {
    background-color: ${() => `${ColorMap['grey'].light}80`};
  }
`;
