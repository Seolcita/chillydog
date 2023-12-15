import { colors } from './tokens/color-token';

export interface ColorVariant {
  background?: string;
  extraLight?: string;
  light?: string;
  main: string;
  dark?: string;
}

export type Colors =
  | 'white'
  | 'black'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'grey';

const ColorMap: Record<Colors, ColorVariant> = {
  white: { main: colors.white.hex },
  black: { main: colors.black.hex },
  primary: {
    background: colors.blueBackground.hex,
    extraLight: colors.blueExtraLight.hex,
    light: colors.blueLight.hex,
    main: colors.blueMedium.hex,
    dark: colors.blueDark.hex,
  },
  success: {
    background: colors.greenBackground.hex,
    extraLight: colors.greenExtraLight.hex,
    light: colors.greenLight.hex,
    main: colors.greenMedium.hex,
    dark: colors.greenDark.hex,
  },
  warning: {
    background: colors.yellowBackground.hex,
    extraLight: colors.yellowExtraLight.hex,
    light: colors.yellowLight.hex,
    main: colors.yellowMedium.hex,
    dark: colors.yellowDark.hex,
  },
  error: {
    background: colors.redBackground.hex,
    extraLight: colors.redExtraLight.hex,
    light: colors.redLight.hex,
    main: colors.redMedium.hex,
    dark: colors.redDark.hex,
  },
  grey: {
    background: colors.greyBackground.hex,
    extraLight: colors.greyExtraLight.hex,
    light: colors.greyLight.hex,
    main: colors.greyMedium.hex,
    dark: colors.greyDark.hex,
  },
};

export { ColorMap };
export default ColorMap;
