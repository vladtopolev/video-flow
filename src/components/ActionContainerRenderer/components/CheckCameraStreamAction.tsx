import { Button } from '@mui/material';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import useTheme from '../../../styles';
import { ActionContainerRendererProps } from '../../../VideoRecordFlow.types';

const CheckCameraStreamAction = ({
  onStopStream,
  buttons,
}: ActionContainerRendererProps) => {
  const {
    spacing,
    button,
    breakpoints: { xs, sm },
  } = useTheme();
  const isNotSmall = !xs && !sm;
  const { onCancel } = useVideoRecordFlowContext();
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: spacing(2),
        padding: spacing(2),
        marginTop: spacing(6),
        ...(isNotSmall && { gridTemplateColumns: '1fr auto' }),
      }}
    >
      <Button
        onClick={() => {
          onStopStream();
          onCancel();
        }}
        sx={{
          ...button.link,
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
        {buttons.back && (
          <Button
            variant="contained"
            sx={{
              ...button.secondary,
              minWidth: 120,
              width: isNotSmall ? 'auto' : '100%',
            }}
            onClick={async () => {
              buttons.back.onAction();
            }}
            disabled={buttons.back.disabled}
          >
            Back
          </Button>
        )}
        {buttons.next && (
          <Button
            variant="contained"
            sx={{
              ...button.primary,
              minWidth: 120,
              width: isNotSmall ? 'auto' : '100%',
            }}
            onClick={async () => {
              buttons.next.onAction();
            }}
            disabled={buttons.next.disabled}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckCameraStreamAction;
