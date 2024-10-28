import { useCallback } from 'react';
import type { SetAvailbaleDevicesFunctionType } from '../../hooks/useAvailableMediaDevices';
import { useAvailableMediaDevices } from '../../hooks/useAvailableMediaDevices';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import TypographySx from '../../styles/typography';
import { Box } from '@mui/material';
import BackgroundMusicSection from './sections/BackgroundMusicSection';

const prefixClassName = 'InitialSettings';

const InitialSettings = () => {
  const setAvailableDevices =
    useCallback<SetAvailbaleDevicesFunctionType>(() => {}, []);

  useAvailableMediaDevices({ setAvailableDevices });

  const { textDictionary } = useVideoRecordFlowContext();
  return (
    <Box className={prefixClassName}>
      <h1 className={`${prefixClassName}__title`} style={TypographySx.titleS}>
        {textDictionary('SettingVideoFlowScreen.Title')}
      </h1>
      <BackgroundMusicSection />
    </Box>
  );
};

export default InitialSettings;
