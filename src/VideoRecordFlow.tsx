import { FC, useState } from 'react';
import {
  DEFAULT_BACKGROUND_MUSIC_LIST,
  DEFAULT_QUESTION_LIST,
} from './VideoRecordFlow.default';
import type {
  BackgroundMusicConfig,
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

import BeforeRecordingScreen from './screens/BeforeRecording/BeforeRecording';
import InitialSettingsScreen from './screens/InitialSettings/InitialSettings';

export type VideoRecordFlowProps = {
  questionList?: QuestionConfig[];
  backgroundMusicList?: BackgroundMusicConfig[];
  videoRecordWayList?: VideoRecordWayTypes[];
  width: number;
  height: number;
  textDictionary?: TextDictionaryFunction;
  ActionContainerRenderer?: FC<ActionContainerRendererProps>;
};

const SCREENS: { [k: string]: FC } = {
  [DefaultScreenTypes.INITIAL_SETTINGS]: InitialSettingsScreen,
  [DefaultScreenTypes.BEFORE_RECORDING]: BeforeRecordingScreen,
};

const VideoRecordFlow = ({
  textDictionary = defaultTextDictionary,
  backgroundMusicList = DEFAULT_BACKGROUND_MUSIC_LIST,
  videoRecordWayList = [
    VideoRecordWayTypes.FREELY,
    VideoRecordWayTypes.RANDOM_QUESTIONS,
  ],
  ActionContainerRenderer = ActionContainerRendererDefault,
  ...restProps
}: VideoRecordFlowProps) => {
  const [currentScreen, setCurrentScreen] = useState<string>(
    DefaultScreenTypes.INITIAL_SETTINGS,
  );

  const CurrentScreen = SCREENS[currentScreen];
  if (!CurrentScreen) {
    throw new Error(`Screen component not defined for key ${currentScreen}`);
  }

  return (
    <VideoRecordFlowContextComponent
      currentScreen={currentScreen}
      questionList={DEFAULT_QUESTION_LIST}
      backgroundMusicList={backgroundMusicList}
      videoRecordWayList={videoRecordWayList}
      setCurrentScreen={setCurrentScreen}
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
