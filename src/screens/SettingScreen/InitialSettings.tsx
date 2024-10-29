import { Box } from '@mui/material';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import TypographySx from '../../styles/typography';
import BackgroundMusicSection from './sections/BackgroundMusicSection';
import CameraCheckSection from './sections/CameraCheckSection';
import useMediaStream from './hook/useMediaStream';

const InitialSettings = () => {
  const { textDictionary, mediaStream } = useVideoRecordFlowContext();

  useMediaStream();

  return (
    <Box className="InitialSettings">
      <h1 style={TypographySx.titleL}>
        {textDictionary('SettingVideoFlowScreen.Title')}
      </h1>
      <CameraCheckSection />
      <BackgroundMusicSection />
      <button onClick={() => mediaStream.stopStream()}>STOP</button>
    </Box>
  );
};

export default InitialSettings;
