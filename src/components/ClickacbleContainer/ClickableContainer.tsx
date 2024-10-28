import { Box, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import useTheme from '../../styles';

const Radio = ({ selected, sx }: { selected?: boolean; sx?: SxProps }) => {
  const { palette } = useTheme();
  return selected ? (
    <Box
      sx={{
        width: 24,
        height: 24,
        border: `2px solid ${palette.primary.main}`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          backgroundColor: palette.primary.main,
        }}
      />
    </Box>
  ) : (
    <Box
      sx={{
        width: 24,
        height: 24,
        border: `2px solid ${palette.grey[400]}`,
        borderRadius: '50%',
        ...sx,
      }}
    />
  );
};

const ClicableContainer = ({
  children,
  onClick,
  sx,
  selected,
  disabled,
  isRadio,
}: {
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  sx?: SxProps;
  isRadio?: boolean;
  onClick?: () => void;
}) => {
  const { palette, corners, spacing } = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        p: spacing(4),
        borderRadius: corners.md,
        border: `1px solid ${palette.grey[400]}`,
        cursor: 'pointer',
        mb: spacing(6),
        ...((!selected || disabled) && {
          '&:hover': {
            borderColor: palette.grey[500],
          },
        }),
        ...(selected && { borderColor: palette.primary.dark }),
        ...sx,
      }}
      {...(!disabled && { onClick })}
    >
      {isRadio && (
        <Radio
          selected={selected}
          sx={{
            position: 'absolute',
            right: 16,
            top: 28,
          }}
        />
      )}
      {children}
    </Box>
  );
};

export default ClicableContainer;
