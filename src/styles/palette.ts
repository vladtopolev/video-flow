import { adjustColor } from '../utils';

const compilePalette = (colors: { primary: string; secondary: string }) => ({
  text: {
    primary: '#262630',
    secondary: '#6B7280',
    disabled: '#B6BBC3',
  },
  primary: {
    main: colors.primary,
    dark: adjustColor(colors.primary, -30),
    light: adjustColor(colors.primary, 30),
    contrastText: '#FFFFFF',
    invisible: '#ECEBFA',
  },
  secondary: {
    main: colors.secondary,
    dark: adjustColor(colors.secondary, -30),
    light: adjustColor(colors.secondary, 30),
    contrastText: '#FFFFFF',
  },
  grey: {
    500: '#9DA3AE',
    400: '#D2D5DA',
    300: '#E5E7EA',
    100: '#F7F9FA',
    800: '#454A54',
  },
  error: {
    main: '#F04B43',
    dark: '#A8342E',
    light: '#F36F68',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#00992B',
    dark: '#006B1E',
    light: '#33AD55',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#EF6C00',
    dark: '#BD5500',
    light: '#FF9800',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#0288D1',
    dark: '#01579B',
    light: '#03A9F4',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FFFFFF',
    dark: '#262630',
    light_30: '#FFFFFF33',
    dark_30: '#26263033',
    dark_60: '#26263033',
  },
  common: {
    white: '#FFFFFF',
    black: '#000000',
  },
  action: {
    disabled: '#D2D5DA',
    disabledBackground: '#F7F9FA',
  },
  shadows: {
    default: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)',
  },
});

export default compilePalette;
