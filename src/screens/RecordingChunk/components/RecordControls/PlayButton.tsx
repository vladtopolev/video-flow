import { Box, Button, SxProps } from '@mui/material';
import { KeyboardEventHandler, useEffect, useRef } from 'react';
import useTheme from '../../../../styles';

const StartRecordButtonSx: SxProps = {
  backgroundColor: 'error.main',
  width: { xs: 38, md: 68 },
  height: { xs: 38, md: 68 },
  borderRadius: '50%',
};

const StopRecordButtonSx: SxProps = {
  backgroundColor: 'error.main',
  width: { xs: 20, md: 32 },
  height: { xs: 20, md: 32 },
  borderRadius: { xs: 1, md: 1.75 },
};

const PlayButton = ({
  disabled,
  onKeyDown,
  onClick,
  isRecording,
}: {
  onClick: () => void;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
  isRecording: boolean;
  disabled?: boolean;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { palette } = useTheme();

  useEffect(() => {
    if (ref && ref.current) {
      ref.current!.focus();
    }
  }, [isRecording, disabled]);

  return (
    <Button
      ref={ref}
      onKeyDown={onKeyDown}
      disabled={disabled}
      sx={{
        width: { xs: 48, md: 80 },
        height: { xs: 48, md: 80 },
        minWidth: 'unset',
        p: 0,
        borderRadius: '50%',
        borderWidth: {
          xs: 3,
          md: 4,
        },
        borderStyle: 'solid',
        borderColor: palette.common.white,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.2s ease',

        '&:active, &:focus-visible': {
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },

        '&.Mui-disabled': {
          borderColor: palette.action.disabled,
          opacity: 0.3,
        },
        '&.Mui-disabled div': {
          backgroundColor: palette.action.disabled,
        },
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          transition: 'all 0.5s ease',
          ...(isRecording ? StopRecordButtonSx : StartRecordButtonSx),
        }}
      />
    </Button>
  );
};

export default PlayButton;
