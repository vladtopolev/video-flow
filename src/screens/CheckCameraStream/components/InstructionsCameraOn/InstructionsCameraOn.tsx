import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Badge from '../../../../components/Badge/Badge';
import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';
import useTheme from '../../../../styles';

type InstructionItemProps = {
  text: string;
};

const InstructionItem = ({ text }: InstructionItemProps) => {
  const { typography, palette, spacing } = useTheme();
  return (
    <div style={{ display: 'flex' }}>
      <CheckCircleIcon sx={{ color: palette.success.main, fontSize: 16 }} />
      <Typography sx={{ ...typography.bodyS, ml: spacing(2) }}>
        {text}
      </Typography>
    </div>
  );
};

const InstructionsCameraOn = () => {
  const { textDictionary } = useVideoRecordFlowContext();
  const { spacing } = useTheme();
  const tips: string[] = textDictionary(
    'Instructions.CameraOn.Tips',
  ) as unknown as string[];

  return (
    <div>
      <Badge style={{ lineHeight: 1, display: 'inline-block' }}>
        {textDictionary('Instructions.CameraOn.Label')}
      </Badge>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing(4),
          marginTop: spacing(5),
        }}
      >
        {tips.map((text: string, index: number) => (
          <InstructionItem key={index} text={text} />
        ))}
      </div>
    </div>
  );
};

export default InstructionsCameraOn;
