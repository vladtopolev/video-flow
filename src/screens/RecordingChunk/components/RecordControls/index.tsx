import { Replay as ReplayIcon } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import BackButton from './BackButton';
import PlayButton from './PlayButton';
import VideoProgress from './VideoProgress';
import VideoTimestamps from './VideoTimestamps';
import useTheme from '../../../../styles';

const TooltipElement = ({
  showTooltip,
  children,
}: {
  children: ReactElement;
  showTooltip: boolean;
}) => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const handleClick = () => {
      setOpen(false);
    };
    const element = document.querySelector('.RecordingChunkScreen');
    element?.addEventListener('click', handleClick);
    return () => element?.removeEventListener('click', handleClick);
  }, []);

  if (!showTooltip) {
    return <>{children}</>;
  }
  return (
    <Tooltip
      title="Start when you are ready"
      arrow
      sx={{ backgroundColor: 'red' }}
      componentsProps={{
        tooltip: {
          sx: { backgroundColor: 'grey.100', color: 'text.primary' },
        },
        arrow: { sx: { color: 'grey.100' } },
      }}
      open={open}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -6],
              },
            },
          ],
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
const RecordControls = ({
  isRecording,
  minDuration,
  maxDuration,
  duration,
  disabled,
  onStart,
  onStop,
  onBack,
  onRerecord,
  titleBackBtn,
  hideTip,
}: {
  isRecording: boolean;
  minDuration?: number;
  maxDuration: number;
  duration: number;
  disabled?: boolean;
  titleBackBtn?: string;
  onStart: () => void;
  onStop: () => void;
  onBack: () => void;
  onRerecord?: () => void;
  hideTip?: boolean;
}) => {
  const { typography, spacing } = useTheme();
  const handleClick = () => {
    const action = isRecording ? onStop : onStart;
    action();
  };
  return (
    <Box
      sx={{
        height: { xs: 48, md: 80 },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr 48px 1fr', md: '1fr 80px 1fr' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          overflow: 'hidden',
          pr: spacing(6),
        }}
      >
        {!isRecording && (
          <BackButton onBack={onBack} titleBackBtn={titleBackBtn} />
        )}
        {isRecording && (
          <VideoProgress
            minDuration={minDuration}
            maxDuration={maxDuration}
            duration={duration}
          />
        )}
      </Box>

      <TooltipElement showTooltip={!isRecording}>
        <Box sx={{ height: '100%' }}>
          <PlayButton
            onKeyDown={(e) => {
              if (e.key === 'Spacebar') {
                handleClick();
              }
            }}
            isRecording={isRecording}
            disabled={disabled}
            onClick={handleClick}
          />
        </Box>
      </TooltipElement>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: isRecording ? 'space-between' : 'flex-end',
          alignItems: 'center',
          pl: spacing(6),
        }}
      >
        {!isRecording && !hideTip && (
          <Typography
            sx={{
              ...typography.bodyS,
              color: 'white',
              textAlign: 'right',
            }}
          >
            Teleprompter will restart when recording begins
          </Typography>
        )}
        {isRecording && (
          <>
            <VideoTimestamps duration={duration} maxDuration={maxDuration} />
            {onRerecord && (
              <IconButton onClick={onRerecord}>
                <ReplayIcon sx={{ color: 'white', fontSize: 32 }} />
              </IconButton>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default RecordControls;
