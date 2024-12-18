import { Box } from '@mui/material';
import { MutableRefObject, useCallback } from 'react';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import { actions } from '../../../state';
import useTheme from '../../../styles';
import { VideoRecordWayTypes } from '../../../VideoRecordFlow.types';
import Telepromter, {
  TelepromterManagerProps,
} from '../components/Teleprompter/Teleprompter';
import TipLookAtTheCamera from '../components/TipLookAtTheCamera';

const TelepromterOverlay = ({
  telepromterManagerRef,
  isChunkRecording,
}: {
  telepromterManagerRef?: MutableRefObject<
    TelepromterManagerProps | null | undefined
  >;
  isChunkRecording?: boolean;
}) => {
  const { spacing } = useTheme();
  const {
    userChoise: {
      currentQuestionIndex,
      pickedQuestions,
      questionsTeleprompterNotes,
      recordVideoWay,
    },
    dispatch,
    textDictionary,
  } = useVideoRecordFlowContext();

  const question =
    recordVideoWay === VideoRecordWayTypes.FREELY
      ? textDictionary('BeforeRecordingScreen.FreelySpeechTelepromterTitle')
      : pickedQuestions[currentQuestionIndex]?.webText;
  const notes = questionsTeleprompterNotes[currentQuestionIndex];
  const changeNotes = useCallback(
    (notes: string) => {
      dispatch(
        actions.setQuestionTeleprompterNote(currentQuestionIndex, notes),
      );
    },
    [dispatch, currentQuestionIndex],
  );

  return (
    <div
      className="telepromter_overlay"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding: spacing(3),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TipLookAtTheCamera sx={{ mb: 2 }} />
      {(question || notes) && (
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <Telepromter
            telepromterManagerRef={telepromterManagerRef}
            question={question}
            notes={notes}
            onNotesChange={changeNotes}
            isChunkRecording={isChunkRecording}
            sx={{
              maxHeight: '100%',
              position: 'absolute',
              left: 0,
              right: 0,
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default TelepromterOverlay;
