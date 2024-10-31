/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fullscreen as FullscreenIcon } from '@mui/icons-material';
import { VolumeOff as VolumeOffIcon } from '@mui/icons-material';
import { VolumeUp as VolumeUpIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import { RefObject, useRef } from 'react';
import PlayButton from './components/PlayButton';
import useTheme from '../../styles';

export type PlayerSizes = 'sm' | 'md' | 'lg';

export const SIZES: {
  [k in PlayerSizes]: {
    icon: number;
    play: number;
    playIconSize: number;
    outerPadding: number;
    innerPadding: number;
  };
} = {
  sm: {
    icon: 24,
    play: 32,
    playIconSize: 16,
    outerPadding: 8,
    innerPadding: 8,
  },
  md: {
    icon: 32,
    play: 48,
    playIconSize: 24,
    outerPadding: 16,
    innerPadding: 16,
  },
  lg: {
    icon: 32,
    play: 68,
    playIconSize: 34,
    outerPadding: 24,
    innerPadding: 16,
  },
};

export type PlayerControlsProps = {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  size: PlayerSizes;
  duration: number;
  onToggleMute: () => void;
  onFullscreen: () => void;
  onTogglePlay: () => void;
  onProgressChange: (e: any, progressRef: RefObject<HTMLDivElement>) => void;
};

const PlayerControls = ({
  size,
  isMuted,
  progress,
  isPlaying,
  duration,
  onToggleMute,
  onFullscreen,
  onTogglePlay,
  onProgressChange,
}: PlayerControlsProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const sizes = SIZES[size];
  const { palette } = useTheme();

  return (
    <Box
      className="player-controls"
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: 'black',
        top: 0,
        zIndex: 3,
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, rgba(0, 0, 0, 0.40) 99.97%)',
        '&:hover .progress-video': {
          height: 16,
        },
        '&:hover .fullscreen-btn': {
          display: 'block',
        },
      }}
    >
      {/* CONTROLS */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: `${sizes.outerPadding}px`,
          position: 'absolute',
          bottom: 24,
          left: 0,
          right: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={onToggleMute}
          >
            {isMuted ? (
              <VolumeOffIcon
                sx={{ color: 'common.white', fontSize: sizes.icon }}
              />
            ) : (
              <VolumeUpIcon
                sx={{ color: 'common.white', fontSize: sizes.icon }}
              />
            )}
          </Box>
          {isPlaying && (
            <Box
              sx={{
                ml: `${sizes.innerPadding}px`,
                display: 'none',
                cursor: 'pointer',
              }}
              className="fullscreen-btn"
              onClick={onFullscreen}
            >
              <FullscreenIcon
                sx={{ color: 'common.white', fontSize: sizes.icon }}
              />
            </Box>
          )}
        </Box>
        <Box>
          <PlayButton
            isPlaying={isPlaying}
            onToggle={onTogglePlay}
            width={sizes.play}
            iconSize={sizes.playIconSize}
          />
        </Box>
      </Box>

      {/* PROGRESS */}
      {isPlaying && (
        <Box
          ref={progressRef}
          className="progress-video"
          sx={{
            position: 'absolute',
            bottom: 0,
            height: 8,
            backgroundColor: palette.grey[300],
            width: '100%',
            cursor: 'pointer',
          }}
          onClick={(e: any) => onProgressChange(e, progressRef)}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: `${(progress * 100) / duration}%`,
              backgroundColor: palette.primary.main,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PlayerControls;
