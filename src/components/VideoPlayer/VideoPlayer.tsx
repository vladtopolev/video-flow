/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, SxProps } from '@mui/material';
import { createFileFromBlobArray } from '../../utils';
import { useEffect, useRef, VideoHTMLAttributes } from 'react';
import useVideoControls from './hooks/useVideoControls';
import PlayerControls, { PlayerSizes } from '../PlayerControls/PlayerControls';

type BlobPlayer = {
  blob: Blob;
  containerStyle?: SxProps;
  index?: number;
  flipVideo?: boolean;
  duration?: number;
  size?: PlayerSizes;
};

type SrcPlayer = {
  src: string;
  containerStyle?: SxProps;
  index?: number;
  flipVideo?: boolean;
  duration?: number;
  size?: PlayerSizes;
};

type VideoPlayerProps = (BlobPlayer | SrcPlayer) &
  VideoHTMLAttributes<HTMLVideoElement>;

const isBlobPlayerProps = (props: VideoPlayerProps): props is BlobPlayer =>
  !!(props as any).blob;

const VideoPlayer = (props: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    progress,
    isMuted,
    isPlaying,
    duration,
    onToggleMute,
    onFullscreen,
    onProgressChange,
    onTogglePlay,
  } = useVideoControls({ videoRef });

  const blob = isBlobPlayerProps(props) ? props.blob : undefined;
  const { autoPlay } = props;

  useEffect(() => {
    if (videoRef.current && blob) {
      const file = createFileFromBlobArray([blob]);

      videoRef.current.src = URL.createObjectURL(file);
      videoRef.current.load();
    }
  }, [blob]);

  return (
    <Box sx={{ ...props.containerStyle, position: 'relative' }}>
      <video
        ref={videoRef}
        playsInline
        autoPlay={autoPlay}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          display: 'block',
          ...(props.flipVideo ? { transform: 'scale(-1,1)' } : {}),
          ...props.style,
        }}
      >
        {!isBlobPlayerProps(props) && (
          <source src={props.src} type="video/mp4" />
        )}
      </video>

      <PlayerControls
        isMuted={isMuted}
        progress={progress}
        isPlaying={isPlaying}
        onFullscreen={onFullscreen}
        onProgressChange={onProgressChange}
        onToggleMute={onToggleMute}
        onTogglePlay={onTogglePlay}
        size={props.size || 'lg'}
        duration={duration}
      />
    </Box>
  );
};

export default VideoPlayer;
