import { useMemo } from 'react';
import compilePalette from './palette';
import cornersDefault from './corners';
import compileTypography from './typography';
import compileButtons from './buttons';
import { useContainerBreakpoints } from './context/ContainerBreakpointsContext';
import { useVideoRecordFlowContext } from '../context/VideoRecordFlow.context';

const useTheme = () => {
  const { breakpoints } = useContainerBreakpoints();
  const { brandStyle } = useVideoRecordFlowContext();

  const spacing = (space: number) => `${4 * space}px`;
  const palette = compilePalette(brandStyle.palette);
  const corners = brandStyle.corners || cornersDefault;
  const button = compileButtons(palette, spacing, corners);
  const typography = compileTypography(brandStyle.fontFamily);

  return useMemo(
    () => ({
      breakpoints,
      palette,
      corners,
      typography,
      button,
      spacing,
    }),
    [breakpoints],
  );
};

export default useTheme;
