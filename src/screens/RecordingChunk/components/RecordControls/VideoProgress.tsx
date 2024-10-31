import { LinearProgress } from '@mui/material';
import useTheme from '../../../../styles';

const VideoProgress = ({
  minDuration,
  maxDuration,
  duration,
}: {
  minDuration?: number;
  maxDuration: number;
  duration: number;
}) => {
  const { palette } = useTheme();
  return (
    <LinearProgress
      variant="determinate"
      sx={{
        height: 8,
        borderRadius: 2.5,
        backgroundColor: palette.grey[800],
        '& .MuiLinearProgress-bar': {
          borderRadius: 2.5,
          backgroundColor: palette.background.default,
        },
        width: '100%',
        ...(minDuration &&
          minDuration !== 0 && {
            '&:after': {
              content: '""',
              display: 'block',
              backgroundColor: 'white',
              width: '2px',
              height: '100%',
              position: 'absolute',
              left: `${(minDuration * 100) / maxDuration}%`,
            },
          }),
      }}
      value={(duration * 100) / maxDuration}
    />
  );
};

export default VideoProgress;
