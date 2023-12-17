interface Size {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

export const size = {
  sm: 600,
  md: 960,
  lg: 1500,
};

export const device: Size = {
  xs: `screen and (width < ${size.sm}px)`, // phone
  sm: `screen and (width >= ${size.sm}px)`, // tablet
  md: `screen and (width >= ${size.md}px)`, // laptop
  lg: `screen and (${size.lg}px <= width)`, // desktop
};
