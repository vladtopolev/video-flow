import { Button } from '@mui/material';
import { DefaultScreenTypes } from '../../VideoRecordFlow.types';

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
  if (currentScreen === DefaultScreenTypes.INITIAL_SETTINGS)
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            onClick={() => {
              buttons.next.onAction();
            }}
            disabled={buttons.next.disabled}
          >
            Next
          </Button>
        )}
      </div>
    );

  return null;
};

export default ActionContainerRendererDefault;
