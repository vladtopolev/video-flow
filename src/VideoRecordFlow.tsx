import { FC, useState } from 'react';
import VideoRecordFlowContextComponent from './context/VideoRecordFlow.context';
import type {
  BackgroundMusicConfig,
  QuestionConfig,
  TextDictionaryFunction,
} from './VideoRecordFlow.types';
import { DefaultScreenTypes } from './VideoRecordFlow.types';
import InitialSettings from './screens/SettingScreen/InitialSettings';
import defaultTextDictionary from './dictionary';
import { useContainerQuery } from 'react-container-query';
import {
  DEFAULT_BACKGROUND_MUSIC_LIST,
  DEFAULT_QUESTION_LIST,
} from './VideoRecordFlow.default';

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

const query = {
  xs: {
    minWidth: 0,
    maxWidth: 199,
  },
  sm: {
    minWidth: 200,
    maxWidth: 599,
  },
  md: {
    minWidth: 600,
    maxWidth: 959,
  },
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
  const [params, containerRef] = useContainerQuery(query, {});
  console.log(params);

  return (
    <VideoRecordFlowContextComponent
      currentScreen={currentScreen}
      questionList={DEFAULT_QUESTION_LIST}
      backgroundMusicList={backgroundMusicList}
      setCurrentScreen={setCurrentScreen}
      textDictionary={textDictionary}
      {...restProps}
    >
      <div ref={containerRef}>
        <CurrentScreen />
      </div>
    </VideoRecordFlowContextComponent>
  );
};

export default VideoRecordFlow;
