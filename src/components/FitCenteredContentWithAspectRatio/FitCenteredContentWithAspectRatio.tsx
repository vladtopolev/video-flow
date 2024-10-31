import { Box, SxProps } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import useMeasure from '../../hooks/useMeasure';

const FitCenteredContentWithAspectRatio = ({
  children,
  aspectRatio,
  sx,
  onDimensionChange,
}: {
  children: ReactNode;
  aspectRatio: number;
  sx?: SxProps;
  onDimensionChange?: (width: number, height: number) => void;
}) => {
  const [ref, { width, height }] = useMeasure();
  const [contentDimension, setContentContentDimension] = useState<{
    contentWidth: number;
    contentHeight: number;
  }>({
    contentHeight: height,
    contentWidth: width,
  });

  useEffect(() => {
    let contentWidth = width;
    let contentHeight = height;

    if (aspectRatio < width / height) {
      contentHeight = height || 1;
      contentWidth = aspectRatio * height;
    } else {
      contentWidth = width || 1;
      contentHeight = width / aspectRatio;
    }

    setContentContentDimension({ contentHeight, contentWidth });
    onDimensionChange?.(contentWidth, contentHeight);
  }, [width, height]);

  return (
    <Box
      className="fitAspectRatio"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      ref={ref}
    >
      <Box
        sx={{
          width: contentDimension.contentWidth,
          height: contentDimension.contentHeight,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default FitCenteredContentWithAspectRatio;
