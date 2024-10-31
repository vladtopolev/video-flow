import StreamVideoPlayer from '../../../components/StreamVideoPlayer/StreamVideoPlayer';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';

const CameraStream = () => {
  const {
    width,
    height,
    mediaStream: { stream },
  } = useVideoRecordFlowContext();
  return (
    <div
      className="videoContainer"
      style={{
        width: '100%',
        aspectRatio: `${width} / ${height}`,
        background: 'red',
      }}
    >
      {stream && (
        <StreamVideoPlayer
          stream={stream}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};

export default CameraStream;
