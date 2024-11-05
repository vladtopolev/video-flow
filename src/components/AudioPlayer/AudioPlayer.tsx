import { Typography, Box, SxProps } from '@mui/material';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useTheme from '../../styles';
import PlayButtonContainer from './components/PlayButtonContainer';
import ProgressBar from './components/ProgressBar';
import useSinglePlayerPlayed from '../../hooks/useSinglePlayerPlayed';

type AudioPlayerProps = {
  src: string;
  containerStyle?: SxProps;
  title?: string;
  coverSrc?: string;
};

export type AudioState = {
  duration: number;
  currentTime: number;
  isPlaying: boolean;
};

const AudioPlayer = ({
  src,
  title,
  containerStyle,
  coverSrc,
}: AudioPlayerProps) => {
  const { typography, spacing } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [audioState, setAudioState] = useState<AudioState>({
    duration: 0,
    currentTime: 0,
    isPlaying: false,
  });

  const { playSideEffectCallback } = useSinglePlayerPlayed({
    stop: () => {
      audioRef.current?.pause();
      setAudioState((prev) => ({ ...prev, isPlaying: false }));
    },
  });

  const getVideoDuration = () =>
    !Number.isFinite(audioRef.current?.duration)
      ? 0
      : audioRef.current?.duration || 0;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const duration = getVideoDuration();
      setAudioState((prev) => ({ ...prev, duration }));
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const handleAudioPlaying = () => {
      const currentTime = audioRef.current?.currentTime || 0;
      const duration = getVideoDuration();
      setAudioState((prev) => ({ ...prev, currentTime, duration }));
    };

    const handleAudioEnded = () => {
      setAudioState((prev) => ({ ...prev, isPlaying: false }));
    };

    audioRef.current?.addEventListener('timeupdate', handleAudioPlaying);
    audioRef.current?.addEventListener('ended', handleAudioEnded);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleAudioPlaying);
      audioRef.current?.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  const togglePlayerState = useCallback(() => {
    if (audioState.isPlaying) {
      audioRef.current?.pause();
    } else {
      playSideEffectCallback();
      audioRef.current?.play();
    }
    setAudioState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, [audioState, setAudioState, playSideEffectCallback]);

  const onClickProgressBar = useCallback<MouseEventHandler>(
    (e) => {
      if (progressRef.current && audioRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        const pos = (e.pageX - rect.left) / progressRef.current.offsetWidth;
        const duration = getVideoDuration();
        const newCurrentTime = pos * duration;

        audioRef.current.currentTime = newCurrentTime;
        setAudioState((prev) => ({
          ...prev,
          currentTime: newCurrentTime,
          duration,
        }));
      }
    },
    [setAudioState],
  );

  return (
    <Box sx={containerStyle}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: spacing(6) }}>
        <div style={{ width: 60 }}>
          <PlayButtonContainer
            onClick={togglePlayerState}
            audioState={audioState}
            coverSrc={coverSrc}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: coverSrc ? 0 : 4,
            marginTop: 1,
            flexGrow: 1,
          }}
        >
          {title && (
            <Typography sx={{ ...typography.bodyM, mb: 1 }}>{title}</Typography>
          )}
          <ProgressBar
            audioRef={audioRef}
            progressRef={progressRef}
            audioState={audioState}
            onClick={onClickProgressBar}
          />
        </div>
      </div>
      <audio ref={audioRef} src={src} style={{ display: 'none' }} />
    </Box>
  );
};

export default AudioPlayer;
