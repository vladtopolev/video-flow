import { useMemo } from 'react';
import palette from './palette';
import corners from './corners';
import typography from './typography';
import getButtons from './buttons';
import { useContainerBreakpoints } from './context/ContainerBreakpointsContext';

const useTheme = () => {
  const { breakpoints } = useContainerBreakpoints();
  const spacing = (space: number) => `${4 * space}px`;
  return useMemo(
    () => ({
      breakpoints,
      palette,
      corners,
      typography,
      button: getButtons(palette, spacing),
      spacing,
    }),
    [breakpoints],
  );
};

export default useTheme;
