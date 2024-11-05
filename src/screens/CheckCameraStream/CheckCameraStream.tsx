import { Typography } from '@mui/material';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';
import useTheme from '../../styles';
import useMediaStream from './hook/useMediaStream';
import CameraCheckSection from './sections/CameraCheckSection';

const CheckCameraStream = () => {
  const {
    textDictionary,
    mediaStream: { stream, stopStream },
    ActionContainerRenderer,
    userChoise: { currentScreen },
    dispatch,
  } = useVideoRecordFlowContext();
  const { typography, spacing } = useTheme();

  useMediaStream();

  return (
    <>
      <div className="InitialSettingsScreen">
        <Typography style={{ ...typography.titleL, marginBottom: spacing(10) }}>
          {textDictionary('SettingVideoFlowScreen.Title')}
        </Typography>

        <CameraCheckSection />
      </div>

      <ActionContainerRenderer
        currentScreen={currentScreen}
        onStopStream={stopStream}
        buttons={{
          back: {
            onAction: () => {
              stopStream();
              dispatch(actions.goPrev());
            },
          },
          next: {
            onAction: () => {
              dispatch(actions.goNext());
            },
            disabled: !stream,
          },
        }}
      />
    </>
  );
};

export default CheckCameraStream;
