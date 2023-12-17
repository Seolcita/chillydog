import { size } from '../styles/Breakpoints';

export enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  TABLET_OR_SMALLER = 'TABLET_OR_SMALLER',
  LAPTOP = 'LAPTOP',
  LAPTOP_OR_SMALLER = 'LAPTOP_OR_SMALLER',
  DESKTOP = 'DESKTOP',
}

export const useDeviceType = (width: number): DeviceType => {
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
