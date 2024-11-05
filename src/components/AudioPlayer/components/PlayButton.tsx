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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      onClick={onClick}
    >
      {audioState.isPlaying ? (
        <PauseIcon sx={{ color: palette.common.white, fontSize: 32 }} />
      ) : (
        <PlayIcon sx={{ color: palette.common.white, fontSize: 32 }} />
      )}
    </div>
  );
};

export default PlayButton;
