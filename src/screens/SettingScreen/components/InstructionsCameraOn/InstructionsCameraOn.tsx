import { Box, Typography } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import useTheme from '../../../../styles';
import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';
import Badge from '../../../../components/Badge/Badge';

type InstructionItemProps = {
  text: string;
};

const InstructionItem = ({ text }: InstructionItemProps) => {
  const { typography, palette } = useTheme();
  return (
    <div style={{ display: 'flex' }}>
      <CheckCircleIcon sx={{ color: palette.success.main, fontSize: 16 }} />
      <Typography sx={{ ...typography.bodyS, ml: 2 }}>{text}</Typography>
    </div>
  );
};

const InstructionsCameraOn = () => {
  const { textDictionary } = useVideoRecordFlowContext();
  const tips: string[] = textDictionary(
    'Instructions.CameraOn.Tips',
  ) as unknown as string[];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Badge style={{ lineHeight: 1, display: 'inline-block' }}>
        {textDictionary('Instructions.CameraOn.Label')}
      </Badge>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 5 }}>
        {tips.map((text: string, index: number) => (
          <InstructionItem key={index} text={text} />
        ))}
      </Box>
    </div>
  );
};

export default InstructionsCameraOn;
