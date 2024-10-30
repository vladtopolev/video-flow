import { Reducer } from 'react';
import { UserChoise, UserChoiseAction } from '..';
import { DefaultScreenTypes } from '../../VideoRecordFlow.types';

export const goToNextReducer: Reducer<UserChoise, UserChoiseAction> = (
  state,
) => {
  if (state.currentScreen === DefaultScreenTypes.INITIAL_SETTINGS) {
    return {
      ...state,
      currentScreen: DefaultScreenTypes.BEFORE_RECORDING,
      currentQuestionIndex: 0,
    };
  }
  if (state.currentScreen === DefaultScreenTypes.BEFORE_RECORDING) {
    return { ...state, currentScreen: DefaultScreenTypes.RECORDING_CHUNK };
  }
  if (state.currentScreen === DefaultScreenTypes.RECORDING_CHUNK) {
    return {
      ...state,
      currentScreen: DefaultScreenTypes.RECORDED_CHUNK_PREVIEW,
    };
  }
  if (state.currentScreen === DefaultScreenTypes.RECORDED_CHUNK_PREVIEW) {
    if (state.currentQuestionIndex === state.pickedQuestions.length - 1) {
      return { ...state, currentScreen: DefaultScreenTypes.UPLOADING_CHUNKS };
    }
    return {
      ...state,
      currentQuestionIndex: state.currentQuestionIndex + 1,
      currentScreen: DefaultScreenTypes.BEFORE_RECORDING,
    };
  }

  return state;
};

export const goToPrevReducer: Reducer<UserChoise, UserChoiseAction> = (
  state,
) => {
  if (state.currentScreen === DefaultScreenTypes.BEFORE_RECORDING) {
    if (state.currentQuestionIndex === 0) {
      return { ...state, currentScreen: DefaultScreenTypes.INITIAL_SETTINGS };
    }
    return {
      ...state,
      currentQuestionIndex: state.currentQuestionIndex - 1,
    };
  }

  if (
    state.currentScreen === DefaultScreenTypes.RECORDING_CHUNK ||
    state.currentScreen === DefaultScreenTypes.RECORDED_CHUNK_PREVIEW
  ) {
    return { ...state, currentScreen: DefaultScreenTypes.BEFORE_RECORDING };
  }
  return state;
};
