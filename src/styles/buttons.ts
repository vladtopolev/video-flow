import { Corners } from '../VideoRecordFlow.types';
import compilePalette from './palette';

const compileButtons = (
  pallete: ReturnType<typeof compilePalette>,
  spacing: (space: number) => string,
  corners: Corners,
) => ({
  link: {
    color: pallete.text.secondary,
    padding: `${spacing(3)} ${spacing(4)}`,
    borderRadius: corners.md,
    fontSize: { xs: '12px', md: '16px' },
  },
  primary: {
    fontSize: { xs: '12px', md: '16px' },
    backgroundColor: pallete.primary.main,
    color: pallete.primary.contrastText,
    padding: `${spacing(3)} ${spacing(4)}`,
    borderRadius: corners.md,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: pallete.primary.dark,
      boxShadow: 'none',
    },
  },
  secondary: {
    fontSize: { xs: '12px', md: '16px' },
    backgroundColor: pallete.background.default,
    color: pallete.primary.dark,
    border: `1px solid`,
    borderColor: pallete.grey[300],
    borderRadius: corners.md,
    boxShadow: 'none',
    '&:hover': {
      borderColor: pallete.grey[500],
      backgroundColor: pallete.background.default,
      boxShadow: 'none',
    },
  },
});

export default compileButtons;
