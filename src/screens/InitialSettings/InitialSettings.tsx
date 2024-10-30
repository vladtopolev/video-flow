import { Typography } from '@mui/material';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';
import useTheme from '../../styles';
import { DefaultScreenTypes } from '../../VideoRecordFlow.types';
import useMediaStream from './hook/useMediaStream';
import BackgroundMusicSection from './sections/BackgroundMusicSection';
import CameraCheckSection from './sections/CameraCheckSection';
import PickRecordVideoWaySection from './sections/PickRecordVideoWaySection';

const InitialSettings = () => {
  const {
    textDictionary,
    mediaStream: { stream, stopStream },
    userChoise: { recordVideoWay },
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
        {stream && (
          <>
            <PickRecordVideoWaySection />
            <BackgroundMusicSection />
          </>
        )}
      </div>

      <ActionContainerRenderer
        currentScreen={currentScreen}
        onStopStream={stopStream}
        buttons={{
          next: {
            onAction: () => {
              dispatch(actions.goNext());
            },
            disabled: !recordVideoWay || !stream,
          },
        }}
      />
    </>
  );
};

export default InitialSettings;
