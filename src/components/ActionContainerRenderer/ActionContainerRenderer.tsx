import {
  ActionContainerRendererProps,
  DefaultScreenTypes,
} from '../../VideoRecordFlow.types';
import BeforeRecordingAction from './components/BeforeRecordingAction';
import CheckCameraStreamAction from './components/CheckCameraStreamAction';
import PickMusicAction from './components/PickMusicAction';
import PickVideoRecordVideoAction from './components/PickVideoRecordVideoAction';
import UploadVideoAction from './components/UploadVideoAction';

const ActionContainerRendererDefault = (
  props: ActionContainerRendererProps,
) => {
  const { currentScreen } = props;

  if (currentScreen === DefaultScreenTypes.PICK_VIDEO_RECORD_WAY) {
    return <PickVideoRecordVideoAction {...props} />;
  }

  if (currentScreen === DefaultScreenTypes.CHECK_CAMERA_STREAM) {
    return <CheckCameraStreamAction {...props} />;
  }

  if (currentScreen === DefaultScreenTypes.BEFORE_RECORDING) {
    return <BeforeRecordingAction {...props} />;
  }

  if (currentScreen === DefaultScreenTypes.PICK_MUSIC) {
    return <PickMusicAction {...props} />;
  }

  if (currentScreen === DefaultScreenTypes.UPLOAD_VIDEO) {
    return <UploadVideoAction {...props} />;
  }

  return null;
};

export default ActionContainerRendererDefault;
