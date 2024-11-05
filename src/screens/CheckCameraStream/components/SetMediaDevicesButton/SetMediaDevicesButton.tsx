import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';
import useTheme from '../../../../styles';
import { useState } from 'react';

const SelectDevice = ({
  label,
  selectedDevice,
  allDevices = [],
  onChange,
}: {
  label: string;
  selectedDevice: MediaDeviceInfo | null;
  allDevices: MediaDeviceInfo[] | null;
  onChange: (device: MediaDeviceInfo) => void;
}) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      value={selectedDevice?.deviceId}
      label={label}
      onChange={(e) => {
        const pickedDevice = allDevices?.find(
          (d) => d.deviceId === e.target.value,
        );
        if (pickedDevice) {
          onChange(pickedDevice);
        }
      }}
    >
      {allDevices?.map((device) => (
        <MenuItem value={device.deviceId} key={device.deviceId}>
          {device.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const SetMediaDevicesButton = () => {
  const {
    textDictionary,
    mediaDevices: {
      availableDevices,
      selectedAudioDevice,
      selectedVideoDevice,
      setSelectedAudioDevice,
      setSelectedVideoDevice,
    },
  } = useVideoRecordFlowContext();
  const { typography, spacing, palette, corners, button } = useTheme();

  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        sx={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          p: spacing(2),
          transform: 'translateX(-50%)',
          backdropFilter: 'blur(10px)',
          textTransform: 'none',
          borderRadius: corners.md,
          border: `1px solid ${palette.background.light_30}`,
          color: palette.common.white,
        }}
        startIcon={<SettingsIcon />}
        onClick={() => setOpen(true)}
      >
        <Typography sx={{ ...typography.bodyS }}>Settings</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
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
          <div style={{ paddingTop: spacing(6) }}>
            <SelectDevice
              label="Camera"
              allDevices={availableDevices.videoDevices || []}
              selectedDevice={selectedVideoDevice}
              onChange={(videoDevice) => setSelectedVideoDevice(videoDevice)}
            />
          </div>
          <div style={{ paddingTop: spacing(6) }}>
            <SelectDevice
              label="Mic"
              allDevices={availableDevices.audioDevices || []}
              selectedDevice={selectedAudioDevice}
              onChange={(audioDevice) => setSelectedAudioDevice(audioDevice)}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            py: spacing(3),
            px: spacing(12),
            borderTop: `1px solid ${palette.grey[400]}`,
          }}
        >
          <Button onClick={onClose} variant="contained" sx={button.primary}>
            {textDictionary('CameraSettings.Modal.Buttons.Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SetMediaDevicesButton;
