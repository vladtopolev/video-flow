import { Box, SxProps } from '@mui/material';
import { Pause as PauseIcon } from '@mui/icons-material';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import useTheme from '../../../styles';

const PlayButton = ({
  sx,
  isPlaying,
  width,
  onToggle,
  iconSize,
}: {
  sx?: SxProps;
  isPlaying: boolean;
  onToggle: () => void;
  width: number;
  iconSize: number;
}) => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        width,
        height: width,
        borderRadius: '50%',
        backgroundColor: palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        ...sx,
      }}
      onClick={onToggle}
    >
      {isPlaying ? (
        <PauseIcon sx={{ color: 'primary.dark', fontSize: iconSize }} />
      ) : (
        <PlayArrowIcon sx={{ color: 'primary.dark', fontSize: iconSize }} />
      )}
    </Box>
  );
};

export default PlayButton;
