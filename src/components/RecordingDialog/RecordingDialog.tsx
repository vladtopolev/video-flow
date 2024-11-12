import { Dialog } from '@mui/material';
import { createContext, ReactNode, useContext } from 'react';
import useTheme from '../../styles';
import useWindowSize from '../../hooks/useWindowSize';

const RecordingDialogContext = createContext<{ width: number }>({
  width: 0,
});

const RecordingDialog = ({ children }: { children: ReactNode }) => {
  const { palette } = useTheme();
  const { width } = useWindowSize();

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
      <RecordingDialogContext.Provider value={{ width }}>
        {children}
      </RecordingDialogContext.Provider>
    </Dialog>
  );
};

export default RecordingDialog;

export const useRecordingDialog = () => useContext(RecordingDialogContext);
