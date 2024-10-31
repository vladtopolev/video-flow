import useTheme from '../../styles';

const useStyles = () => {
  const { palette, corners } = useTheme();
  return {
    videoContainerSx: {
      position: 'relative',
      minHeight: 10,
      backgroundColor: palette.common.black,
      display: 'flex',
      alignItems: 'center',
      borderRadius: {
        xs: corners.md,
        md: corners.lg,
      },
      overflow: 'hidden',
    },
  };
};

export default useStyles;
