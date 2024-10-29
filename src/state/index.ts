import { Reducer, useReducer } from 'react';
import { BackgroundMusicConfig } from '../VideoRecordFlow.types';
import { VideoRecordWayTypes } from '../recordVideoWays';

export type UserChoise = {
  music: BackgroundMusicConfig | null;
  recordVideoWay: VideoRecordWayTypes | null;
};

const initialUserChoise: UserChoise = {
  music: null,
  recordVideoWay: null,
};

export type UserChoiseAction = {
  type: string;
  payload: Partial<UserChoise>;
};

const reducer: Reducer<UserChoise, UserChoiseAction> = (state, action) => ({
  ...state,
  ...action.payload,
});

const useRecordVideoFlowUserChoise = () => {
  const [userChoise, dispatch] = useReducer(reducer, initialUserChoise);

  return { userChoise, dispatch };
};

export const actions = {
  setMusic: (music: BackgroundMusicConfig | null): UserChoiseAction => ({
    type: 'SET_PICKED_MUSIC',
    payload: { music },
  }),
  setRecordVideoWay: (
    recordVideoWay: VideoRecordWayTypes | null,
  ): UserChoiseAction => ({
    type: 'SET_RECORD_VIDEO_WAY',
    payload: { recordVideoWay },
  }),
};

export default useRecordVideoFlowUserChoise;
