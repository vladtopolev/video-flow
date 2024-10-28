import { CSSProperties } from 'react';
import StreamVideoPlayer from '../../../components/StreamVideoPlayer/StreamVideoPlayer';

const CameraStream = ({
  stream,
  style,
}: {
  stream: MediaStream | null;
  style?: CSSProperties;
}) => {
  if (!stream) {
    return <div className="CameraStream" style={{ ...style }} />;
  }

  return (
    <div className="CameraStream" style={style}>
      <StreamVideoPlayer
        stream={stream}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default CameraStream;
