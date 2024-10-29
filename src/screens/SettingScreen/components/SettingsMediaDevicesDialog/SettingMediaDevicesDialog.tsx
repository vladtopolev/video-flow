import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Typography,
} from '@mui/material';
import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';
import useTheme from '../../../../styles';

type SettingMediaDevicesDialogProps = DialogProps & {
  onClose?: () => void;
};

const SettingMediaDevicesDialog = (
  dialogProps: SettingMediaDevicesDialogProps,
) => {
  const { textDictionary } = useVideoRecordFlowContext();
  const { typography, spacing, palette } = useTheme();
  return (
    <Dialog
      {...dialogProps}
      maxWidth="sm"
      fullWidth
      sx={{
        '.MuiDialog-container': {
          background: 'rgba(38, 38, 48, 0.10)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <DialogContent sx={{ p: spacing(12) }}>
        <Typography sx={{ ...typography.titleM }} component="h1">
          {textDictionary('CameraSettings.Modal.Title')}
        </Typography>
        <Typography
          sx={{ ...typography.bodyXL, mt: spacing(2) }}
          component="div"
        >
          {textDictionary('CameraSettings.Modal.Description')}
        </Typography>

        {/*
        <Box sx={{ pt: 6 }}>
          <SelectExtended
            label={textDictionary('CameraSettings.Modal.Fields.Camera.Label')}
            fullWidth
            value={
              selectedVideoDevice?.deviceId ||
              availableMediaDevice.videoDevices[0]?.deviceId
            }
            onChange={(e) => onChangeDevice('video', e.target.value as string)}
            items={(availableMediaDevice.videoDevices || []).map((device) => ({
              title: device.label,
              value: device.deviceId,
            }))}
          />
        </Box>

        <Box sx={{ pt: 6 }}>
          <SelectExtended
            label={t('CameraSettings.Modal.Fields.Microphone.Label')}
            fullWidth
            value={
              selectedAudioDevice?.deviceId ||
              availableMediaDevice.audioDevices[0]?.deviceId
            }
            onChange={(e) => onChangeDevice('audio', e.target.value as string)}
            items={(availableMediaDevice.audioDevices || []).map((device) => ({
              title: device.label,
              value: device.deviceId,
            }))}
          />
        </Box>
        */}
      </DialogContent>
      <DialogActions
        sx={{
          py: spacing(3),
          px: spacing(12),
          borderTop: `1px solid ${palette.grey[400]}`,
        }}
      >
        <Button onClick={dialogProps.onClose} variant="contained" size="large">
          {textDictionary('CameraSettings.Modal.Buttons.Close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingMediaDevicesDialog;
