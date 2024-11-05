import { Reducer, useReducer } from 'react';
import {
  BackgroundMusicConfig,
  DefaultScreenTypes,
  QuestionConfig,
} from '../VideoRecordFlow.types';
import { VideoRecordWayTypes } from '../recordVideoWays';
import { goToNextReducer, goToPrevReducer } from './reducers';

export type UserChoise = {
  currentScreen: string;
  music: BackgroundMusicConfig | null;
  recordVideoWay: VideoRecordWayTypes | null;
  questionsTeleprompterNotes: string[];
  currentQuestionIndex: number;
  pickedQuestions: QuestionConfig[];
};

const initialUserChoise: UserChoise = {
  music: null,
  recordVideoWay: null,
  currentScreen: DefaultScreenTypes.PICK_VIDEO_RECORD_WAY,
  pickedQuestions: [],
  questionsTeleprompterNotes: [],
  currentQuestionIndex: -1,
};

export enum UserChoiseActionTypes {
  SET_PARTIAL_STATE,
  SET_QUESTION_TELEPROMPTER_NOTE,
  GO_TO_SCREEN,
  GO_NEXT,
  GO_PREV,
}

export type UserChoiseAction =
  | {
      type: UserChoiseActionTypes.SET_PARTIAL_STATE;
      payload: Partial<UserChoise>;
    }
  | {
      type: UserChoiseActionTypes.GO_TO_SCREEN;
      payload: { nextScreen: string };
    }
  | {
      type: UserChoiseActionTypes.SET_QUESTION_TELEPROMPTER_NOTE;
      payload: { index: number; text: string };
    }
  | {
      type: UserChoiseActionTypes.GO_NEXT | UserChoiseActionTypes.GO_PREV;
      payload: undefined;
    };

const reducer: Reducer<UserChoise, UserChoiseAction> = (state, action) => {
  // GO NEXT
  if (action.type === UserChoiseActionTypes.GO_NEXT) {
    return goToNextReducer(state, action);
  }

  // GO PREV
  if (action.type === UserChoiseActionTypes.GO_PREV) {
    return goToPrevReducer(state, action);
  }

  if (action.type === UserChoiseActionTypes.SET_QUESTION_TELEPROMPTER_NOTE) {
    const { index, text } = action.payload;
    const questionsTeleprompterNotes = [...state.questionsTeleprompterNotes];
    questionsTeleprompterNotes[index] = text;
    return { ...state, questionsTeleprompterNotes };
  }

  if (action.type === UserChoiseActionTypes.GO_TO_SCREEN) {
    if (
      state.currentScreen === DefaultScreenTypes.INITIAL_SETTINGS &&
      action.payload.nextScreen === DefaultScreenTypes.BEFORE_RECORDING
    ) {
      return {
        ...state,
        currentScreen: action.payload.nextScreen,
        currentQuestionIndex: 0,
      };
    }

    return {
      ...state,
      currentScreen: action.payload.nextScreen,
    };
  }

  return {
    ...state,
    ...action.payload,
  };
};

const useRecordVideoFlowUserChoise = () => {
  const [userChoise, dispatch] = useReducer(reducer, initialUserChoise);

  return { userChoise, dispatch };
};

export const actions = {
  setMusic: (music: BackgroundMusicConfig | null): UserChoiseAction => ({
    type: UserChoiseActionTypes.SET_PARTIAL_STATE,
    payload: { music },
  }),
  setRecordVideoWay: (
    recordVideoWay: VideoRecordWayTypes | null,
  ): UserChoiseAction => ({
    type: UserChoiseActionTypes.SET_PARTIAL_STATE,
    payload: { recordVideoWay },
  }),
  setCurrentScreen: (currentScreen: string): UserChoiseAction => ({
    type: UserChoiseActionTypes.SET_PARTIAL_STATE,
    payload: { currentScreen },
  }),
  goToScreen: (nextScreen: string): UserChoiseAction => ({
    type: UserChoiseActionTypes.GO_TO_SCREEN,
    payload: { nextScreen },
  }),
  setPickedQuestions: (
    pickedQuestions: QuestionConfig[],
  ): UserChoiseAction => ({
    type: UserChoiseActionTypes.SET_PARTIAL_STATE,
    payload: {
      pickedQuestions,
      questionsTeleprompterNotes: pickedQuestions.map((q) => q.promptTip || ''),
    },
  }),
  setQuestionTeleprompterNote: (
    index: number,
    text: string,
  ): UserChoiseAction => ({
    type: UserChoiseActionTypes.SET_QUESTION_TELEPROMPTER_NOTE,
    payload: { index, text },
  }),
  goNext: (): UserChoiseAction => ({
    type: UserChoiseActionTypes.GO_NEXT,
    payload: undefined,
  }),
  goPrev: (): UserChoiseAction => ({
    type: UserChoiseActionTypes.GO_PREV,
    payload: undefined,
  }),
};

export default useRecordVideoFlowUserChoise;
