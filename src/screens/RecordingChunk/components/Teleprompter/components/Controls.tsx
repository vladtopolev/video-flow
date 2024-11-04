import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { Stop as StopIcon } from '@mui/icons-material';
import { Pause as PauseIcon } from '@mui/icons-material';
import { Box, Button, Switch, Typography } from '@mui/material';
import { useVideoRecordFlowContext } from '../../../../../context/VideoRecordFlow.context';
import useTheme from '../../../../../styles';
import SliderWithButtons from '../../../../../components/SliderWithButtons/SliderWithButtons';

const MIN_SPEED = 1;
const MAX_SPEED = 5;
const STEP_SPEED = 1;

const MIN_FONT_SIZE = 16;
const MAX_FONT_SIZE = 42;
const STEP_FONT_SIZE = 4;

const Controls = ({
  isScrolling,
  isChunkRecording,
  toggleScrolling,
}: {
  isScrolling: boolean;
  isChunkRecording?: boolean;
  toggleScrolling: () => void;
}) => {
  const isMobile = false; // TODO
  const { palette, spacing, typography } = useTheme();

  const {
    telepromterSettings: {
      speed,
      setSpeed,
      fontSize,
      setFontSize,
      shouldBeScrolled,
      setShouldBeScrolled,
    },
  } = useVideoRecordFlowContext();

  if (isChunkRecording && !shouldBeScrolled) {
    return null;
  }

  if (isChunkRecording) {
    return (
      <Box
        className="telepromter-control"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          borderTop: `1px solid ${palette.background.light_30}`,
          mx: spacing(-6),
          px: { xs: spacing(4), md: spacing(6) },
          pt: spacing(2),
        }}
        onClick={toggleScrolling}
      >
        <Button
          startIcon={isScrolling ? <PauseIcon /> : <PlayArrowIcon />}
          sx={{ minHeight: 24, color: 'white' }}
        >
          <Typography sx={typography.titleXS}>
            {isScrolling ? 'Pause teleprompter' : 'Start teleprompter'}
          </Typography>
        </Button>
      </Box>
    );
  }

  return (
    <Box
      className="telepromter-control"
      sx={{
        display: 'flex',
        gap: spacing(6),
        flexWrap: 'wrap',
        borderTop: `1px solid ${palette.background.light_30}`,
        mx: spacing(-6),
        px: { xs: spacing(4), md: spacing(6) },
        pt: spacing(2),
      }}
    >
      {!isMobile && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={typography.bodyS}>Font:</Typography>
          <SliderWithButtons
            value={fontSize}
            onChange={setFontSize}
            min={MIN_FONT_SIZE}
            max={MAX_FONT_SIZE}
            step={STEP_FONT_SIZE}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={typography.bodyS}>Autoscroll</Typography>
        <Switch
          checked={shouldBeScrolled}
          onChange={(_, checked) => {
            setShouldBeScrolled(checked);
            if (isScrolling) {
              toggleScrolling();
            }
          }}
          sx={{
            opacity: shouldBeScrolled ? 1 : 0.5,
            width: 52,
            height: 24,
            p: spacing(0),
            '& .MuiButtonBase-root': { p: spacing(0) },
            '& .MuiSwitch-thumb': {
              mt: '1px',
              width: 22,
              height: 22,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
              transform: 'translateX(29px)',
              color: 'white',
            },
            '& .MuiSwitch-switchBase.Mui-checked +.MuiSwitch-track': {
              borderColor: palette.grey[300],
              backgroundColor: palette.background.light_30,
            },
            '& .MuiSwitch-track': {
              boxSizing: 'border-box',
              border: `1px solid ${palette.grey[300]}`,
              borderRadius: '12px',
              borderColor: palette.grey[300],
              backgroundColor: palette.background.light_30,
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          opacity: shouldBeScrolled ? 1 : 0.5,
        }}
      >
        <Typography sx={typography.bodyS}>Speed:</Typography>
        <SliderWithButtons
          value={speed}
          onChange={setSpeed}
          min={MIN_SPEED}
          max={MAX_SPEED}
          step={STEP_SPEED}
          disabled={!shouldBeScrolled}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button
          onClick={toggleScrolling}
          variant="outlined"
          size="small"
          startIcon={isScrolling ? <StopIcon /> : <PlayArrowIcon />}
          disabled={!shouldBeScrolled}
          sx={{
            opacity: shouldBeScrolled ? 1 : 0.5,
            p: spacing(0),
            pl: spacing(1),
            pr: spacing(2),
            height: 26,
            color: 'white',
            border: `1px solid ${palette.background.light_30}`,
            '&.Mui-disabled': {
              borderColor: palette.background.light_30,
            },
            '& .MuiButton-startIcon': { mr: spacing(1) },
          }}
        >
          <Typography sx={typography.titleXS}>
            {isScrolling ? 'Stop' : 'Test'}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Controls;
