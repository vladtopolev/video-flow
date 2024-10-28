import { useReducer, Reducer } from 'react';

export type VideoRecordFlowState = {
  currentScreen: string;
};
const initialState: VideoRecordFlowState = {
  currentScreen: '',
};

export enum VideoRecordFlowActionType {
  SET_SCREEN,
}

type VideoRecordFlowAction = {
  type: VideoRecordFlowActionType;
  payload: unknown;
} & {
  type: VideoRecordFlowActionType.SET_SCREEN;
  payload: string;
};

const reducer: Reducer<VideoRecordFlowState, VideoRecordFlowAction> = (
  state,
  action,
) => {
  if (action.type === VideoRecordFlowActionType.SET_SCREEN) {
    return { ...state, currentScreen: action.payload };
  }
  return state;
};

const useVideoFlowState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useVideoFlowState;
