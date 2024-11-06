import { useEffect } from 'react';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import { actions } from '../../../state';

export const FREELY_SPEECH_ID = 'Freely';

const Freely = () => {
  const { dispatch, textDictionary } = useVideoRecordFlowContext();
  useEffect(() => {
    dispatch(
      actions.setPickedQuestions([
        {
          id: FREELY_SPEECH_ID,
          webText: textDictionary('BeforeRecordingScreen.FreelySpeechTitle'),
        },
      ]),
    );
  }, [dispatch, textDictionary]);
  return null;
};

export default Freely;
