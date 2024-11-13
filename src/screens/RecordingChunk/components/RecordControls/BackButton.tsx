import { Button } from '@mui/material';
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
  const { palette, button } = useTheme();

  return (
    <Button
      sx={{ ...button.link, color: palette.common.white }}
      onClick={() => onBack()}
    >
      {titleBackBtn || textDictionary('Buttons.Back')}
    </Button>
  );
};
export default BackButton;
