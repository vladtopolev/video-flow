import { Pause as PauseIcon, PlayArrow as PlayIcon } from '@mui/icons-material';
import { CSSProperties } from 'react';
import { AudioState } from '../AudioPlayer';
import useTheme from '../../../styles';

const PlayButton = ({
  onClick,
  audioState,
  style,
}: {
  onClick: () => void;
  audioState: AudioState;
  style?: CSSProperties;
}) => {
  const { palette } = useTheme();
  return (
    <div
      style={{
        cursor: 'pointer',
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: `1px solid ${palette.grey[400]}`,
        backgroundColor: palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      onClick={onClick}
    >
      {audioState.isPlaying ? (
        <PauseIcon sx={{ color: palette.primary.dark }} />
      ) : (
        <PlayIcon sx={{ color: palette.primary.dark }} />
      )}
    </div>
  );
};

export default PlayButton;
