import { TextField } from '@mui/material';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import TipContainer from '../../components/TipContainer/TipContainer';
import useTheme from '../../styles';

const BeforeRecording = () => {
  const { textDictionary } = useVideoRecordFlowContext();
  const { spacing } = useTheme();
  return (
    <>
      <div>
        <TextField
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
    </>
  );
};

export default BeforeRecording;
