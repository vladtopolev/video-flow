import { Dialog } from '@mui/material';
import { ReactNode } from 'react';
import useTheme from '../../styles';

const ReacordingDialog = ({ children }: { children: ReactNode }) => {
  const { palette } = useTheme();
  return (
    <Dialog
      fullScreen
      open
      PaperProps={{
        sx: {
          backgroundColor: palette.background.dark,
          height: '100dvh',
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default ReacordingDialog;
