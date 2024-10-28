import { useCallback } from 'react';
import type { SetAvailbaleDevicesFunctionType } from '../../hooks/useAvailableMediaDevices';
import { useAvailableMediaDevices } from '../../hooks/useAvailableMediaDevices';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import TypographySx from '../../styles/typography';
import { Box } from '@mui/material';
import BackgroundMusicSection from './sections/BackgroundMusicSection';
import CameraCheckSection from './sections/CameraCheckSection';

const InitialSettings = () => {
  const setAvailableDevices =
    useCallback<SetAvailbaleDevicesFunctionType>(() => {}, []);

  useAvailableMediaDevices({ setAvailableDevices });

  const { textDictionary } = useVideoRecordFlowContext();
  return (
    <Box className="InitialSettings">
      <h1 style={TypographySx.titleL}>
        {textDictionary('SettingVideoFlowScreen.Title')}
      </h1>
      <CameraCheckSection />
      <BackgroundMusicSection />
    </Box>
  );
};

export default InitialSettings;
