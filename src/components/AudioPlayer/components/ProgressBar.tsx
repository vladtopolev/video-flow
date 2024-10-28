import { MouseEventHandler, RefObject } from 'react';
import useTheme from '../../../styles';
import { AudioState } from '../AudioPlayer';

const ProgressBar = ({
  progressRef,
  onClick,
  audioState,
}: {
  progressRef: RefObject<HTMLDivElement>;
  audioRef: RefObject<HTMLAudioElement | null>;
  onClick: MouseEventHandler;
  audioState: AudioState;
}) => {
  const { palette } = useTheme();
  return (
    <div
      style={{ width: '100%', display: 'flex', alignItems: 'center' }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="video-progress-container"
        ref={progressRef}
        style={{
          height: 8,
          backgroundColor: palette.grey[300],
          borderRadius: 3,
          position: 'relative',
          width: '100%',
        }}
        onClick={onClick}
      >
        <div
          className="video-progress"
          style={{
            backgroundColor: palette.primary.main,
            position: 'absolute',
            height: '100%',
            width: `${
              audioState.duration !== 0
                ? (audioState.currentTime * 100) / audioState.duration
                : 0
            }%`,
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
