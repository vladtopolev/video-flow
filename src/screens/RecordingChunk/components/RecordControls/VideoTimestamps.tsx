import { Box, Typography } from '@mui/material';
import { secsToTime } from '../../../../utils';
import useTheme from '../../../../styles';

const VideoTimestamps = ({
  duration,
  maxDuration,
}: {
  duration: number;
  maxDuration: number;
}) => {
  const { typography, spacing, palette } = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography
        sx={{
          ...typography.titleXS,
          fontWeight: 600,
          mr: spacing(1),
          color: 'white',
        }}
      >
        {secsToTime(duration)}
      </Typography>
      <Typography
        sx={{
          ...typography.titleXS,
          fontWeight: 600,
          color: palette.text.secondary,
        }}
      >
        {secsToTime(maxDuration)}
      </Typography>
    </Box>
  );
};

export default VideoTimestamps;
