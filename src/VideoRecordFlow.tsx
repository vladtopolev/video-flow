import { FC, lazy, Suspense, useCallback, useEffect, useMemo } from 'react';
import {
  BRAND_STYLES,
  DEFAULT_BACKGROUND_MUSIC_LIST,
  DEFAULT_QUESTION_LIST,
} from './VideoRecordFlow.default';
import type {
  BackgroundMusicConfig,
  BlobUploader,
  BrandStyle,
  CustomTextDictionaryFunction,
  FileUploader,
  FinishedHandler,
  QuestionConfig,
  TextDictionaryFunction,
} from './VideoRecordFlow.types';
import {
  DefaultScreenTypes,
  VideoRecordWayTypes,
} from './VideoRecordFlow.types';
import ActionContainerRendererDefault, {
  ActionContainerRendererProps,
} from './components/ActionContainerRenderer/ActionContainerRenderer';
import VideoRecordFlowContextComponent from './context/VideoRecordFlow.context';
import defaultTextDictionary from './dictionary';
import useRecordVideoFlowUserChoise, { actions } from './state';
import ContainerBreakpointsContextComponent from './styles/context/ContainerBreakpointsContext';
import { shuffleArray } from './utils';

const BeforeRecordingScreen = lazy(
  () => import('./screens/BeforeRecording/BeforeRecording'),
);
const CheckCameraStreamScreen = lazy(
  () => import('./screens/CheckCameraStream/CheckCameraStream'),
);
const PickMusicScreen = lazy(() => import('./screens/PickMusic/PickMusic'));
const PickVideoRecordWayScreen = lazy(
  () => import('./screens/PickVideoRecordWay/PickVideoRecordWay'),
);
const RecordedChunkPreviewScreen = lazy(
  () => import('./screens/RecordedChunkPreview/RecordedChunkPreview'),
);
const RecordingChunkScreen = lazy(
  () => import('./screens/RecordingChunk/RecordingChunk'),
);
const UploadOwnVideoScreen = lazy(
  () => import('./screens/UploadOwnVideo/UploadOwnVideo'),
);
const UploadingChunksScreen = lazy(
  () => import('./screens/UploadingChunks/UploadingChunks'),
);

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
  brandStyle = BRAND_STYLES,
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
    () => shuffleArray(backgroundMusicList),
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
        <Suspense fallback={'...Loading'}>
          <CurrentScreen />
        </Suspense>
      </ContainerBreakpointsContextComponent>
    </VideoRecordFlowContextComponent>
  );
};

export default VideoRecordFlow;
