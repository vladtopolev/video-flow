import { useEffect, useRef, CSSProperties, memo } from 'react';

type StreamVideoPlayerProps = {
  stream: MediaStream;
  style?: CSSProperties;
};
const StreamVideoPlayer = ({ stream, style }: StreamVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      muted
      autoPlay
      loop
      playsInline
      style={{
        transform: 'scale(-1, 1)',
        display: 'block',
        objectFit: 'cover',
        ...style,
      }}
    />
  );
};

export default memo(StreamVideoPlayer);
