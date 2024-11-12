import { TextField, Typography } from '@mui/material';
import TipContainer from '../../components/TipContainer/TipContainer';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';
import useTheme from '../../styles';
import Header from './components/QuestionHeader';

const BeforeRecording = () => {
  const {
    textDictionary,
    userChoise: {
      currentQuestionIndex,
      questionsTeleprompterNotes,
      pickedQuestions,
      currentScreen,
    },
    mediaStream: { stopStream },
    dispatch,
    ActionContainerRenderer,
  } = useVideoRecordFlowContext();
  const { spacing, typography } = useTheme();

  const title = pickedQuestions[currentQuestionIndex]?.webText;
  return (
    <>
      <div className="BeforeRecordingScreen">
        <Header />
        <Typography
          sx={{ mt: spacing(6), mb: spacing(10), ...typography.titleL }}
          component="div"
        >
          {title}
        </Typography>
        <TextField
          value={questionsTeleprompterNotes[currentQuestionIndex]}
          onChange={(e) => {
            dispatch(
              actions.setQuestionTeleprompterNote(
                currentQuestionIndex,
                e.target.value,
              ),
            );
          }}
          multiline
          fullWidth
          placeholder={textDictionary(
            'BeforeRecordingScreen.Controls.Notes.Placeholder',
          )}
          label={textDictionary('BeforeRecordingScreen.Controls.Notes.Label')}
          minRows={4}
        />
        <TipContainer
          tipText={textDictionary('BeforeRecordingScreen.Tip')}
          title={textDictionary('Titles.TipTitle')}
          style={{ marginTop: spacing(4) }}
        />
      </div>
      <ActionContainerRenderer
        currentScreen={currentScreen}
        onStopStream={stopStream}
        buttons={{
          next: {
            onAction: () => {
              dispatch(actions.goNext());
            },
          },
          back: {
            onAction: () => {
              dispatch(actions.goPrev());
            },
          },
        }}
      />
    </>
  );
};

export default BeforeRecording;
