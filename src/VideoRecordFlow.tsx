import { FC, useEffect } from 'react';
import {
  DEFAULT_BACKGROUND_MUSIC_LIST,
  DEFAULT_QUESTION_LIST,
} from './VideoRecordFlow.default';
import type {
  BackgroundMusicConfig,
  FinishedHandler,
  QuestionConfig,
  TextDictionaryFunction,
} from './VideoRecordFlow.types';
import { DefaultScreenTypes } from './VideoRecordFlow.types';
import ActionContainerRendererDefault, {
  ActionContainerRendererProps,
} from './components/ActionContainerRenderer/ActionContainerRenderer';
import VideoRecordFlowContextComponent from './context/VideoRecordFlow.context';
import defaultTextDictionary from './dictionary';
import { VideoRecordWayTypes } from './recordVideoWays';
import ContainerBreakpointsContextComponent from './styles/context/ContainerBreakpointsContext';
import useRecordVideoFlowUserChoise from './state';
import type { BlobUploader } from './VideoRecordFlow.types';

import PickVideoRecordWayScreen from './screens/PickVideoRecordWay/PickVideoRecordWay';
import BeforeRecordingScreen from './screens/BeforeRecording/BeforeRecording';
import CheckCameraStreamScreen from './screens/CheckCameraStream/CheckCameraStream';
import RecordingChunkScreen from './screens/RecordingChunk/RecordingChunk';
import RecordedChunkPreviewScreen from './screens/RecordedChunkPreview/RecordedChunkPreview';
import UploadingChunksScreen from './screens/UploadingChunks/UploadingChunks';

export type VideoRecordFlowProps = {
  questionList?: QuestionConfig[];
  backgroundMusicList?: BackgroundMusicConfig[];
  videoRecordWayList?: VideoRecordWayTypes[];
  width: number;
  height: number;
  minVideoDurationDefault?: number;
  maxVideoDurationDefault?: number;
  textDictionary?: TextDictionaryFunction;
  blobUploader: BlobUploader;
  onCancel: () => void;
  onFinished: FinishedHandler;
  ActionContainerRenderer?: FC<ActionContainerRendererProps>;
};

const SCREENS: { [k: string]: FC } = {
  [DefaultScreenTypes.PICK_VIDEO_RECORD_WAY]: PickVideoRecordWayScreen,
  [DefaultScreenTypes.CHECK_CAMERA_STREAM]: CheckCameraStreamScreen,
  [DefaultScreenTypes.INITIAL_SETTINGS]: CheckCameraStreamScreen,
  [DefaultScreenTypes.BEFORE_RECORDING]: BeforeRecordingScreen,
  [DefaultScreenTypes.RECORDING_CHUNK]: RecordingChunkScreen,
  [DefaultScreenTypes.RECORDED_CHUNK_PREVIEW]: RecordedChunkPreviewScreen,
  [DefaultScreenTypes.UPLOADING_CHUNKS]: UploadingChunksScreen,
};

const VideoRecordFlow = ({
  textDictionary = defaultTextDictionary,
  backgroundMusicList = DEFAULT_BACKGROUND_MUSIC_LIST,
  questionList = DEFAULT_QUESTION_LIST,
  videoRecordWayList = [
    VideoRecordWayTypes.FREELY,
    VideoRecordWayTypes.RANDOM_QUESTIONS,
    VideoRecordWayTypes.UPLOAD_VIDEO,
  ],
  minVideoDurationDefault = 0,
  maxVideoDurationDefault = 3 * 60,
  ActionContainerRenderer = ActionContainerRendererDefault,
  ...restProps
}: VideoRecordFlowProps) => {
  const { userChoise, dispatch } = useRecordVideoFlowUserChoise();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [userChoise.currentScreen]);

  const CurrentScreen = SCREENS[userChoise.currentScreen];
  if (!CurrentScreen) {
    throw new Error(
      `Screen component not defined for key ${userChoise.currentScreen}`,
    );
  }

  return (
    <VideoRecordFlowContextComponent
      userChoise={userChoise}
      dispatch={dispatch}
      questionList={questionList}
      backgroundMusicList={backgroundMusicList}
      videoRecordWayList={videoRecordWayList}
      minVideoDurationDefault={minVideoDurationDefault}
      maxVideoDurationDefault={maxVideoDurationDefault}
      textDictionary={textDictionary}
      ActionContainerRenderer={ActionContainerRenderer}
      {...restProps}
    >
      <ContainerBreakpointsContextComponent>
        <CurrentScreen />
      </ContainerBreakpointsContextComponent>
    </VideoRecordFlowContextComponent>
  );
};

export default VideoRecordFlow;
