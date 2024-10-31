import {
  attachFullscreenEvent,
  isFullscreen,
  requestFullscreen,
} from '../../../utils';
import { RefObject, useCallback, useEffect, useState } from 'react';

const useVideoControls = ({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement>;
}) => {
  const [playerState, setPlayerState] = useState<{
    isPlaying: boolean;
    isMuted: boolean;
    progress: number;
    isFullscreen: boolean;
    duration: number;
  }>({
    isPlaying: false,
    isMuted: false,
    progress: 0,
    isFullscreen: false,
    duration: 0,
  });

  const getVideoDuration = useCallback(
    () =>
      (!Number.isFinite(videoRef.current?.duration)
        ? 0
        : videoRef.current?.duration) || 0,
    [],
  );

  useEffect(() => {
    setPlayerState((prev) => ({ ...prev, duration: getVideoDuration() }));
  }, []);

  const onToggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !playerState.isMuted;
      setPlayerState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    }
  }, [playerState]);

  const onTogglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  const onFullscreen = useCallback(() => {
    requestFullscreen(videoRef.current);
    setPlayerState((prev) => ({ ...prev, isFullscreen: true }));
  }, []);

  const onProgressChange = useCallback(
    (e: any, progressRef: RefObject<HTMLDivElement>) => {
      if (progressRef.current && videoRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        const pos = (e.pageX - rect.left) / progressRef.current.offsetWidth;
        const duration = getVideoDuration();
        const newProgress = pos * duration;

        videoRef.current.currentTime = newProgress;
        setPlayerState((prev) => ({
          ...prev,
          progress: newProgress,
          duration,
        }));
      }
    },
    [],
  );

  useEffect(() => {
    const handler = () => {
      if (isFullscreen()) {
        videoRef.current?.pause();
        setPlayerState((prev) => ({
          ...prev,
          isFullscreen: false,
          isPlaying: false,
        }));
      }
    };
    const removeHandlersFn = attachFullscreenEvent(handler);
    return removeHandlersFn;
  }, []);

  // sync video state with React state
  useEffect(() => {
    if (videoRef.current) {
      const trackVideoState = () => {
        setPlayerState((prev) => ({
          ...prev,
          isPlaying: !videoRef.current?.paused,
        }));
      };
      videoRef.current.addEventListener('play', trackVideoState);
      videoRef.current.addEventListener('pause', trackVideoState);
      videoRef.current.addEventListener('ended', trackVideoState);

      return () => {
        videoRef.current?.removeEventListener('play', trackVideoState);
        videoRef.current?.removeEventListener('pause', trackVideoState);
        videoRef.current?.removeEventListener('ended', trackVideoState);
      };
    }
  }, []);

  useEffect(() => {
    const onTimeUpdated = () => {
      const progress = videoRef.current?.currentTime || 0;
      const duration = getVideoDuration();
      setPlayerState((prev) => ({ ...prev, progress, duration }));
    };

    const onEnded = () => {
      setPlayerState((prev) => ({ ...prev, isPlaying: false }));
    };

    const onPause = () => {
      setPlayerState((prev) => ({ ...prev, isPlaying: false }));
    };

    const handleChangeFullscreen = () => {
      if (!document.fullscreenElement) {
        setPlayerState((prev) => ({ ...prev, isFullscreen: false }));
      }
    };

    videoRef.current?.addEventListener('timeupdate', onTimeUpdated);
    videoRef.current?.addEventListener('ended', onEnded);
    videoRef.current?.addEventListener('pause', onPause);

    document.addEventListener('fullscreenchange', handleChangeFullscreen);

    return () => {
      videoRef.current?.removeEventListener('timeupdate', onTimeUpdated);
      videoRef.current?.removeEventListener('ended', onEnded);
      videoRef.current?.removeEventListener('pause', onPause);
      document.removeEventListener('fullscreenchange', handleChangeFullscreen);
    };
  }, []);

  return {
    ...playerState,
    onToggleMute,
    onTogglePlay,
    onFullscreen,
    onProgressChange,
  };
};

export default useVideoControls;
