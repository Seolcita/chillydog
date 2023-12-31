import styled from 'styled-components';
import { device } from '../../styles/Breakpoints';
import { DeviceType } from '../../hooks/use-window-resize';
import ColorMap from '../../styles/Color';

interface TitleProps {
  $point: number;
  $deviceType: DeviceType;
}

export const setCardSize = (deviceType: DeviceType): number => {
  if (deviceType === DeviceType.MOBILE) {
    return 60;
  } else if (deviceType === DeviceType.TABLET) {
    return 40;
  } else {
    return 60;
  }
};

export const setFontSize = (deviceType: DeviceType): string => {
  if (deviceType === DeviceType.MOBILE) {
    return '2rem';
  } else if (deviceType === DeviceType.TABLET) {
    return '2rem';
  } else {
    return '2.2rem';
  }
};

export const titleColorMap: Record<number, string> = {
  1: ColorMap['success'].main,
  2: ColorMap['success'].dark!,
  3: ColorMap['warning'].light!,
  4: ColorMap['warning'].main,
  5: ColorMap['success'].main,
};

export const CardContainer = styled.div`
  display: flex;
  justify-content: start;
  margin: 2rem 3rem 0 0;
  width: 100%;

  @media ${device.xs} {
    margin: 2rem 0 0;
  }

  @media ${device.sm} {
    margin: 2rem 2rem 0 0;
  }

  @media ${device.md} {
    margin: 2rem 3rem 0 0;
  }
`;

export const Contents = styled.div`
  display: flex;
  border-radius: 0.5rem;
  padding: 0 1rem;
  width: 100%;
`;

export const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  width: 100%;

  @media ${device.xs} {
    padding: 0 0 0 2rem;
  }
`;

export const Title = styled.h1<TitleProps>`
  color: ${({ $point }) => titleColorMap[$point]};
  font-size: ${({ $deviceType }) => setFontSize($deviceType)};
  margin: 1rem 0;
  line-height: 2.5rem;
`;
