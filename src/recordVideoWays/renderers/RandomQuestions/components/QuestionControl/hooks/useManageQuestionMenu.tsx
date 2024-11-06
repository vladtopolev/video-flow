import { useCallback, useState, MouseEvent } from 'react';

const useManageQuestionMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const onOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = useCallback(() => {
    setAnchorEl(() => null);
  }, []);

  return { onOpen, onClose, anchorEl };
};

export default useManageQuestionMenu;
