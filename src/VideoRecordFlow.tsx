import { FC, useCallback, useEffect, useMemo } from 'react';
import {
  DEFAULT_BACKGROUND_MUSIC_LIST,
  DEFAULT_QUESTION_LIST,
} from './VideoRecordFlow.default';
import type {
  BackgroundMusicConfig,
  FileUploader,
  FinishedHandler,
  QuestionConfig,
  TextDictionaryFunction,
  BrandStyle,
  CustomTextDictionaryFunction,
} from './VideoRecordFlow.types';
import { DefaultScreenTypes } from './VideoRecordFlow.types';
import ActionContainerRendererDefault, {
  ActionContainerRendererProps,
} from './components/ActionContainerRenderer/ActionContainerRenderer';
import VideoRecordFlowContextComponent from './context/VideoRecordFlow.context';
import defaultTextDictionary from './dictionary';
import { VideoRecordWayTypes } from './recordVideoWays';
import ContainerBreakpointsContextComponent from './styles/context/ContainerBreakpointsContext';
import useRecordVideoFlowUserChoise, { actions } from './state';
import type { BlobUploader } from './VideoRecordFlow.types';
import utils from './utils';

import PickVideoRecordWayScreen from './screens/PickVideoRecordWay/PickVideoRecordWay';
import BeforeRecordingScreen from './screens/BeforeRecording/BeforeRecording';
import CheckCameraStreamScreen from './screens/CheckCameraStream/CheckCameraStream';
import RecordingChunkScreen from './screens/RecordingChunk/RecordingChunk';
import RecordedChunkPreviewScreen from './screens/RecordedChunkPreview/RecordedChunkPreview';
import UploadingChunksScreen from './screens/UploadingChunks/UploadingChunks';
import PickMusicScreen from './screens/PickMusic/PickMusic';
import UploadOwnVideoScreen from './screens/UploadOwnVideo/UploadOwnVideo';

export type VideoRecordFlowProps = {
  questionList?: QuestionConfig[];
  backgroundMusicList?: BackgroundMusicConfig[];
  videoRecordWayList?: VideoRecordWayTypes[];
  width: number;
  height: number;
  minVideoDurationDefault?: number;
  maxVideoDurationDefault?: number;
  maxQuestionsCount?: number;
  brandStyle?: BrandStyle;
  textDictionary?: CustomTextDictionaryFunction;
  blobUploader: BlobUploader;
  fileUploader?: FileUploader;
  onCancel: () => void;
  onFinished: FinishedHandler;
  ActionContainerRenderer?: FC<ActionContainerRendererProps>;
};

const SCREENS: { [k: string]: FC } = {
  [DefaultScreenTypes.PICK_VIDEO_RECORD_WAY]: PickVideoRecordWayScreen,
  [DefaultScreenTypes.CHECK_CAMERA_STREAM]: CheckCameraStreamScreen,
  [DefaultScreenTypes.BEFORE_RECORDING]: BeforeRecordingScreen,
  [DefaultScreenTypes.RECORDING_CHUNK]: RecordingChunkScreen,
  [DefaultScreenTypes.RECORDED_CHUNK_PREVIEW]: RecordedChunkPreviewScreen,
  [DefaultScreenTypes.PICK_MUSIC]: PickMusicScreen,
  [DefaultScreenTypes.UPLOADING_CHUNKS]: UploadingChunksScreen,
  [DefaultScreenTypes.UPLOAD_VIDEO]: UploadOwnVideoScreen,
};

const VideoRecordFlow = ({
  textDictionary: customTextDictionary,
  backgroundMusicList = DEFAULT_BACKGROUND_MUSIC_LIST,
  questionList = DEFAULT_QUESTION_LIST,
  videoRecordWayList = [
    VideoRecordWayTypes.FREELY,
    VideoRecordWayTypes.RANDOM_QUESTIONS,
    VideoRecordWayTypes.UPLOAD_VIDEO,
  ],
  brandStyle = {
    fontFamily: {
      title: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    palette: {
      primary: '#4338CA',
      secondary: '#4338CA',
    },
  },
  minVideoDurationDefault = 0,
  maxVideoDurationDefault = 3 * 60,
  maxQuestionsCount = 5,
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

  // shuffle music and set first one as default
  const shuffledBackgroundMusicList = useMemo(
    () => utils.shuffleArray(backgroundMusicList),
    [backgroundMusicList],
  );

  const textDictionary = useCallback<TextDictionaryFunction>(
    (text, opts) =>
      customTextDictionary?.(text, opts) || defaultTextDictionary(text, opts),
    [customTextDictionary],
  );

  useEffect(() => {
    dispatch(actions.setMusic(shuffledBackgroundMusicList[0]));
  }, [shuffledBackgroundMusicList, dispatch]);

  return (
    <VideoRecordFlowContextComponent
      textDictionary={textDictionary}
      userChoise={userChoise}
      dispatch={dispatch}
      questionList={questionList}
      backgroundMusicList={shuffledBackgroundMusicList}
      videoRecordWayList={videoRecordWayList}
      minVideoDurationDefault={minVideoDurationDefault}
      maxVideoDurationDefault={maxVideoDurationDefault}
      maxQuestionsCount={maxQuestionsCount}
      brandStyle={brandStyle}
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
