import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import TypographySx from '../../styles/typography';
import { DefaultScreenTypes } from '../../VideoRecordFlow.types';
import useMediaStream from './hook/useMediaStream';
import BackgroundMusicSection from './sections/BackgroundMusicSection';
import CameraCheckSection from './sections/CameraCheckSection';
import PickRecordVideoWaySection from './sections/PickRecordVideoWaySection';

const InitialSettings = () => {
  const {
    textDictionary,
    currentScreen,
    mediaStream: { stream, stopStream },
    userChoise: { recordVideoWay },
    ActionContainerRenderer,
    setCurrentScreen,
  } = useVideoRecordFlowContext();

  useMediaStream();

  return (
    <>
      <div className="InitialSettings">
        <h1 style={TypographySx.titleL}>
          {textDictionary('SettingVideoFlowScreen.Title')}
        </h1>

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
              setCurrentScreen(DefaultScreenTypes.BEFORE_RECORDING);
            },
            disabled: !recordVideoWay || !stream,
          },
        }}
      />
    </>
  );
};

export default InitialSettings;
