import { Button } from '@mui/material';
import { DefaultScreenTypes } from '../../VideoRecordFlow.types';
import useTheme from '../../styles';

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
    breakpoints: { xs, sm },
  } = useTheme();

  const isNotSmall = !xs && !sm;

  if (currentScreen === DefaultScreenTypes.INITIAL_SETTINGS)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: spacing(2),
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            onStopStream();
          }}
        >
          Cancel
        </Button>
        {buttons.next && (
          <Button
            variant="contained"
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

  if (currentScreen === DefaultScreenTypes.BEFORE_RECORDING) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: spacing(2),
          padding: spacing(2),
          ...(isNotSmall && { gridTemplateColumns: '1fr auto' }),
        }}
      >
        <Button
          onClick={() => {
            onStopStream();
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

  return null;
};

export default ActionContainerRendererDefault;
