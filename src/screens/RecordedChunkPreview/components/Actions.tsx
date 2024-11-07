import { Box, Button } from '@mui/material';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import useTheme from '../../../styles';
import { useContainerQuery } from 'react-container-query';
import { actions } from '../../../state';

const query = {
  small: {
    minWidth: 0,
    maxWidth: 299,
  },
  medium: {
    minWidth: 300,
  },
};

const Actions = () => {
  const {
    mediaStream: { stopStream },
    dispatch,
    onCancel,
  } = useVideoRecordFlowContext();
  const { spacing, button, palette } = useTheme();

  const [params, containerRef] = useContainerQuery(query, {});

  const isNotSmall = params.medium;

  return (
    <Box
      ref={containerRef}
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
