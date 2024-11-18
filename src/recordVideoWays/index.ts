import { VideoRecordWayTypes } from '../VideoRecordFlow.types';
import FreelyRenderer from './renderers/Freely/Freely';
import RandomQuestionsRenderer from './renderers/RandomQuestions/RandomQuestions';

export const VIDEO_RECORD_WAYS_RENDERERS = {
  [VideoRecordWayTypes.FREELY]: FreelyRenderer,
  [VideoRecordWayTypes.RANDOM_QUESTIONS]: RandomQuestionsRenderer,
  [VideoRecordWayTypes.UPLOAD_VIDEO]: () => null,
};
