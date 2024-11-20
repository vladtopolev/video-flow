import { Button } from '@mui/material';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import useTheme from '../../../styles';
import { ActionContainerRendererProps } from '../../../VideoRecordFlow.types';

const UploadVideoAction = ({
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
      {buttons.back && (
        <Button
          variant="contained"
          sx={{ ...button.primary, minWidth: 120 }}
          onClick={async () => {
            buttons.back.onAction();
          }}
        >
          Back
        </Button>
      )}
    </div>
  );
};
export default UploadVideoAction;
