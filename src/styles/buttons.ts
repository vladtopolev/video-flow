import paletteDefault from './palette';

const getButtons = (
  pallete: typeof paletteDefault,
  spacing: (space: number) => string,
) => ({
  link: {
    color: pallete.text.secondary,
    padding: `${spacing(3)} ${spacing(4)}`,
    borderRadius: '8px',
  },
  primary: {
    backgroundColor: pallete.primary.main,
    color: pallete.primary.contrastText,
    padding: `${spacing(3)} ${spacing(4)}`,
    borderRadius: '8px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: pallete.primary.dark,
      boxShadow: 'none',
    },
  },
  secondary: {
    backgroundColor: pallete.background.default,
    color: pallete.primary.dark,
    border: `1px solid`,
    borderColor: pallete.grey[300],
    borderRadius: '8px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: pallete.grey[500],
      backgroundColor: pallete.background.default,
      boxShadow: 'none',
    },
  },
});

export default getButtons;
