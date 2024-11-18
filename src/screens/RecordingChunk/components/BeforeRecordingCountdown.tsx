import { Box, Typography } from '@mui/material';
import Countdown from '../../../components/Countdown/Countdown';
import useTheme from '../../../styles';
import { hex2rgba } from '../../../utils';

const BeforeRecordingCountdownsScreen = ({
  countdown,
  showTitle,
}: {
  countdown: number;
  showTitle?: boolean;
}) => {
  const { palette, typography } = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: hex2rgba(palette.background.dark_60, 0.6),
      }}
    >
      <Countdown counter={countdown} sx={{ width: '100%' }} />
      {showTitle && (
        <Typography sx={{ mt: 6, color: 'white', ...typography.bodyL }}>
          Promter srarts automatically
        </Typography>
      )}
    </Box>
  );
};

export default BeforeRecordingCountdownsScreen;
