import { useEffect } from 'react';

const useWarningCloseWindow = (showWarning: boolean) => {
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (showWarning) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', beforeUnload);

    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [showWarning]);
};

export default useWarningCloseWindow;
