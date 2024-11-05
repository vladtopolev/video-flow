import useTheme from '../../../styles';
import { AudioState } from '../AudioPlayer';
import PlayButton from './PlayButton';

const PlayButtonContainer = ({
  onClick,
  audioState,
  coverSrc,
}: {
  onClick: () => void;
  audioState: AudioState;
  coverSrc?: string;
}) => {
  const { corners } = useTheme();
  return coverSrc ? (
    <div
      style={{
        width: '100%',
        aspectRatio: '1',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: corners.sm,
          overflow: 'hidden',
        }}
      >
        <img
          src={coverSrc}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <PlayButton
        onClick={onClick}
        audioState={audioState}
        style={{ position: 'relative' }}
      />
    </div>
  ) : (
    <div
      style={{
        width: '100%',
        maxWidth: 48,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <PlayButton onClick={onClick} audioState={audioState} />
    </div>
  );
};

export default PlayButtonContainer;
