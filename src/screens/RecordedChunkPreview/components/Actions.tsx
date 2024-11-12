import { Box, Button } from '@mui/material';
import { useRecordingDialog } from '../../../components/RecordingDialog/RecordingDialog';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import { actions } from '../../../state';
import useTheme from '../../../styles';

const Actions = () => {
  const {
    mediaStream: { stopStream },
    dispatch,
    onCancel,
  } = useVideoRecordFlowContext();
  const { spacing, button, palette } = useTheme();

  const { width } = useRecordingDialog();

  const isNotSmall = width > 600;

  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: spacing(2),
        padding: spacing(2),
        ...(isNotSmall && { gridTemplateColumns: '1fr auto' }),
      }}
    >
      <Button
        sx={{ ...button.link, color: palette.common.white }}
        onClick={() => {
          stopStream();
          onCancel();
        }}
        style={{
          order: isNotSmall ? 0 : 1,
          justifySelf: isNotSmall ? 'start' : 'auto',
        }}
      >
        Cancel
      </Button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: spacing(2),
        }}
      >
        <Button
          variant="contained"
          sx={{
            ...button.secondary,
            minWidth: 120,
            width: isNotSmall ? 'auto' : '100%',
          }}
          onClick={async () => {
            dispatch(actions.goPrev());
          }}
        >
          Re-record
        </Button>
        <Button
          sx={{
            ...button.primary,
            minWidth: 120,
            width: isNotSmall ? 'auto' : '100%',
          }}
          variant="contained"
          onClick={async () => {
            dispatch(actions.goNext());
          }}
        >
          Next
        </Button>
      </div>
    </Box>
  );
};

export default Actions;
