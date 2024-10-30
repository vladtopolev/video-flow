import { useEffect } from 'react';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import { actions } from '../../../state';

const Freely = () => {
  const { dispatch, textDictionary } = useVideoRecordFlowContext();
  useEffect(() => {
    dispatch(
      actions.setPickedQuestions([
        {
          id: 'FreeSpeach',
          webText: textDictionary('BeforeRecordingScreen.FreelySpeechTitle'),
        },
      ]),
    );
  }, [dispatch, textDictionary]);
  return null;
};

export default Freely;
