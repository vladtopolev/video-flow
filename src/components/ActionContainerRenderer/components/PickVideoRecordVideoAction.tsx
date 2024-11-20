import { Button } from '@mui/material';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import useTheme from '../../../styles';
import { ActionContainerRendererProps } from '../../../VideoRecordFlow.types';

const PickVideoRecordVideoAction = ({
  buttons,
  onStopStream,
}: ActionContainerRendererProps) => {
  const { spacing, button } = useTheme();
  const { onCancel } = useVideoRecordFlowContext();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: spacing(2),
        marginTop: spacing(6),
      }}
    >
      <Button
        sx={button.link}
        onClick={() => {
          onStopStream();
          onCancel();
        }}
      >
        Cancel
      </Button>
      {buttons.next && (
        <Button
          variant="contained"
          sx={{ ...button.primary, minWidth: 120 }}
          onClick={async () => {
            buttons.next.onAction();
          }}
          disabled={buttons.next.disabled}
        >
          Next
        </Button>
      )}
    </div>
  );
};
export default PickVideoRecordVideoAction;
