import { useEffect, useState } from 'react';
import { size } from '../styles/Breakpoints';

export enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  TABLET_OR_SMALLER = 'TABLET_OR_SMALLER',
  LAPTOP = 'LAPTOP',
  LAPTOP_OR_SMALLER = 'LAPTOP_OR_SMALLER',
  DESKTOP = 'DESKTOP',
}

type useWindowSizeResult = {
  width: number;
  deviceType: DeviceType;
};

export const useWindowSize = (): useWindowSizeResult => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const deviceType = useDeviceType(width);

  return { width, deviceType };
};

const useDeviceType = (width: number): DeviceType => {
  if (width < size.sm) {
    return DeviceType.MOBILE;
  } else if (size.sm <= width && width < size.md) {
    return DeviceType.TABLET;
  } else if (width < size.md) {
    return DeviceType.TABLET_OR_SMALLER;
  } else if (size.md <= width && width < size.lg) {
    return DeviceType.LAPTOP;
  } else if (width < size.lg) {
    return DeviceType.LAPTOP_OR_SMALLER;
  } else {
    return DeviceType.DESKTOP;
  }
};
