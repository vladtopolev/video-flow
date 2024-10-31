/* eslint-disable react/prop-types */
import { Slider, SliderMark, SliderThumb, Typography } from '@mui/material';
import useTheme from '../../../../../styles';

type SpeedSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const MIN_SPEED = 1;
const MAX_SPEED = 5;
const STEP_SPEED = 1;

const SpeedSlider = ({ value, onChange }: SpeedSliderProps) => {
  const { typography } = useTheme();
  return (
    <Slider
      value={value}
      onChange={(_, newValue) => onChange(newValue as number)}
      min={MIN_SPEED}
      max={MAX_SPEED}
      step={STEP_SPEED}
      marks
      slots={{
        mark: (props) => {
          const firstMark = 0;
          const lastMark = (MAX_SPEED - MIN_SPEED) / STEP_SPEED;
          if ([firstMark, lastMark].includes(props['data-index'])) {
            return null;
          }
          return <SliderMark {...props} />;
        },

        thumb: (props) => {
          const { children, ...rest } = props;
          return (
            <SliderThumb {...rest} style={{ ...rest.style }}>
              {children}
              <Typography sx={typography.titleXL}>{value}</Typography>
            </SliderThumb>
          );
        },
      }}
      sx={{
        height: 8,
        mx: 6,
        display: 'block',
        '& .MuiSlider-rail': {
          backgroundColor: 'grey.500',
        },
        '& .MuiSlider-track': {
          border: 'none',
          backgroundColor: 'grey.300',
        },
        '& .MuiSlider-mark': {
          backgroundColor: 'grey.800',
          height: 8,
          borderRadius: 0,
        },
        '& .MuiSlider-thumb': {
          backgroundColor: 'white',
          width: 40,
          height: 25,
          borderRadius: 24,
        },
      }}
    />
  );
};

export default SpeedSlider;
