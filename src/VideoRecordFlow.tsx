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
import VideoRecordFlowContextComponent from './context/VideoRecordFlow.context';
import defaultTextDictionary from './dictionary';
import InitialSettings from './screens/SettingScreen/InitialSettings';
import ContainerBreakpointsContextComponent from './styles/context/ContainerBreakpointsContext';

export type VideoRecordFlowProps = {
  questionList?: QuestionConfig[];
  backgroundMusicList?: BackgroundMusicConfig[];
  textDictionary?: TextDictionaryFunction;
  width: number;
  height: number;
};

const SCREENS: { [k: string]: FC } = {
  [DefaultScreenTypes.INITIAL_SETTINGS]: InitialSettings,
};

const VideoRecordFlow = ({
  textDictionary = defaultTextDictionary,
  backgroundMusicList = DEFAULT_BACKGROUND_MUSIC_LIST,
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
      setCurrentScreen={setCurrentScreen}
      textDictionary={textDictionary}
      {...restProps}
    >
      <ContainerBreakpointsContextComponent>
        <CurrentScreen />
      </ContainerBreakpointsContextComponent>
    </VideoRecordFlowContextComponent>
  );
};

export default VideoRecordFlow;
