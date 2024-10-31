import { Box, Typography } from '@mui/material';
import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';
import useTheme from '../../../../styles';

const BackButton = ({
  onBack,
  titleBackBtn,
}: {
  onBack: () => void;
  titleBackBtn?: string;
}) => {
  const { textDictionary } = useVideoRecordFlowContext();
  const { typography, palette } = useTheme();

  return (
    <Box
      sx={{
        color: palette.common.white,
        textTransform: 'uppercase',
        fontWeight: 700,
      }}
      onChange={onBack}
    >
      <Typography sx={typography.titleS}>
        {titleBackBtn || textDictionary('Buttons.Back')}
      </Typography>
    </Box>
  );
};
export default BackButton;
