import { Button } from '@mui/material';
import { DefaultScreenTypes } from '../../VideoRecordFlow.types';
import useTheme from '../../styles';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';

export type ActionContainerRendererProps = {
  currentScreen: string;
  onStopStream: () => void;
  buttons: { [k: string]: { onAction: () => void; disabled?: boolean } };
};

const ActionContainerRendererDefault = ({
  currentScreen,
  onStopStream,
  buttons,
}: ActionContainerRendererProps) => {
  const {
    spacing,
    button,
    breakpoints: { xs, sm },
  } = useTheme();
  const { onCancel } = useVideoRecordFlowContext();

  const isNotSmall = !xs && !sm;

  if (currentScreen === DefaultScreenTypes.PICK_VIDEO_RECORD_WAY) {
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
  }

  if (currentScreen === DefaultScreenTypes.CHECK_CAMERA_STREAM) {
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
  }

  if (currentScreen === DefaultScreenTypes.BEFORE_RECORDING) {
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
          sx={button.link}
          onClick={() => {
            onStopStream();
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
              disabled={buttons.next.disabled}
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
  }

  if (currentScreen === DefaultScreenTypes.PICK_MUSIC) {
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
          sx={button.link}
          onClick={() => {
            onStopStream();
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
              disabled={buttons.next.disabled}
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
  }

  if (currentScreen === DefaultScreenTypes.UPLOAD_VIDEO) {
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
  }

  return null;
};

export default ActionContainerRendererDefault;
