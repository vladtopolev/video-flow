import { useMemo } from 'react';
import palette from './palette';
import corners from './corners';
import typography from './typography';
import { useContainerBreakpoints } from './context/ContainerBreakpointsContext';

const useTheme = () => {
  const { breakpoints } = useContainerBreakpoints();
  return useMemo(
    () => ({
      breakpoints,
      palette,
      corners,
      typography,
      spacing: (space: number) => `${4 * space}px`,
    }),
    [breakpoints],
  );
};

export default useTheme;
