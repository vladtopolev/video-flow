import FreelyRenderer from './renderers/Freely/Freely';
import RandomQuestionsRenderer from './renderers/RandomQuestions/RandomQuestions';

export enum VideoRecordWayTypes {
  FREELY = 'Freely',
  RANDOM_QUESTIONS = 'RandomQuestions',
}

export const VIDEO_RECORD_WAYS_RENDERERS = {
  [VideoRecordWayTypes.FREELY]: FreelyRenderer,
  [VideoRecordWayTypes.RANDOM_QUESTIONS]: RandomQuestionsRenderer,
};
