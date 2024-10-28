import { useMemo } from 'react';
import breakpoints from './breakpoints';
import palette from './palette';
import corners from './corners';
import typography from './typography';

const useTheme = () =>
  useMemo(
    () => ({
      breakpoints,
      palette,
      corners,
      typography,
      spacing: (space: number) => `${4 * space}px`,
    }),
    [],
  );

export default useTheme;
