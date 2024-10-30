import { TextField, Typography } from '@mui/material';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import TipContainer from '../../components/TipContainer/TipContainer';
import useTheme from '../../styles';
import { actions } from '../../state';
import Header from './components/QuestionHeader';
import { DefaultScreenTypes } from '../../VideoRecordFlow.types';

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

  console.log(
    pickedQuestions,
    currentQuestionIndex,
    questionsTeleprompterNotes,
  );
  const { spacing, typography } = useTheme();

  const title = pickedQuestions[currentQuestionIndex]?.webText;
  return (
    <>
      <div className="BeforeRecordingScreen">
        <Header />
        <Typography sx={{ my: 10, ...typography.titleL }} component="div">
          {title}
        </Typography>
        <TextField
          value={questionsTeleprompterNotes[currentQuestionIndex]}
          onChange={(e) => {
            console.log(e.target.value, currentQuestionIndex);
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
