import { Box, Typography } from '@mui/material';
import SupportLinkCameraOff from './SupportLinkCameraOff';
import useTheme from '../../../../styles';
import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';

const InstructionsCameraOff = () => {
  const { typography } = useTheme();
  const { textDictionary } = useVideoRecordFlowContext();
  return (
    <Box
      sx={{
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      <Typography sx={{ ...typography.titleXS }}>
        {textDictionary('Instructions.CameraOff.Title')}
      </Typography>
      <Typography
        component="div"
        sx={{ ...typography.bodyS, mt: 1, mb: 4, whiteSpace: 'pre-line' }}
      >
        {textDictionary('Instructions.CameraOff.Description')}
      </Typography>
      <SupportLinkCameraOff />
    </Box>
  );
};

export default InstructionsCameraOff;
