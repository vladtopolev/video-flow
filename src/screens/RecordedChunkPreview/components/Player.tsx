import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';

const Player = () => {
  const {
    width,
    height,
    userChoise: { currentQuestionIndex },
    chunksManagment: { chunks },
  } = useVideoRecordFlowContext();

  const chunk = chunks[currentQuestionIndex];
  const blob = chunk?.blob;
  const recordedDuration = chunk?.duration;
  return (
    <div
      className="videoContainer"
      style={{
        width: '100%',
        aspectRatio: `${width} / ${height}`,
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
