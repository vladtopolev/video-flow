import { Info as InfoIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { isFirefox, isSafari } from 'react-device-detect';
import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';

const LINK_SUPPORTS = {
  chrome: 'https://support.google.com/chrome/answer/2693767',
  safari: 'https://support.apple.com/en-gb/guide/mac-help/mchlf6d108da/mac',
  firefox:
    'https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions',
};

const SupportLinkCameraOff = () => {
  const { textDictionary } = useVideoRecordFlowContext();
  let href = LINK_SUPPORTS.chrome;
  if (isSafari) {
    href = LINK_SUPPORTS.safari;
  }
  if (isFirefox) {
    href = LINK_SUPPORTS.firefox;
  }

  return (
    <Button
      variant="contained"
      href={href}
      target="_blank"
      sx={{}}
      startIcon={<InfoIcon />}
    >
      {textDictionary('Instructions.CameraOff.Button')}
    </Button>
  );
};

export default SupportLinkCameraOff;
