import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';

const Player = () => {
  const {
    width,
    height,
    userChoise: { currentQuestionIndex },
    chunks,
  } = useVideoRecordFlowContext();

  const recordedDuration = 100; // TODO: get from context
  const blob = chunks[currentQuestionIndex];
  return (
    <div
      className="videoContainer"
      style={{
        width: '100%',
        aspectRatio: `${width} / ${height}`,
        background: 'red',
      }}
    >
      <VideoPlayer
        blob={blob}
        duration={recordedDuration}
        containerStyle={{
          aspectRatio: `${width}/${height}`,
          height: '100%',
          position: 'relative',
          margin: '0 auto',
          maxWidth: '100%',
          borderRadius: 0.5,
          overflow: 'hidden',
        }}
        size={'md'}
        flipVideo
      />
    </div>
  );
};

export default Player;
