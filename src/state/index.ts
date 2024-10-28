import { Reducer, useReducer } from 'react';
import { BackgroundMusicConfig } from '../VideoRecordFlow.types';

export type UserChoise = {
  music: BackgroundMusicConfig | null;
};

const initialUserChoise: UserChoise = {
  music: null,
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
};

export default useRecordVideoFlowUserChoise;
