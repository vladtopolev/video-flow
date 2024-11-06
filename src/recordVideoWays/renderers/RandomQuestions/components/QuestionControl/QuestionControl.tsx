import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import useTheme from '../../../../../styles';
import { QuestionConfig } from '../../../../../VideoRecordFlow.types';
import QuestionMenu from '../QuestionMenu/QuestionMenu';
import Container from './components/Container';
import useManageQuestionMenu from './hooks/useManageQuestionMenu';

const QuestionControl = ({
  question,
  onChange,
}: {
  question: QuestionConfig | null;
  onChange: (question: QuestionConfig | null) => void;
}) => {
  const { palette, typography } = useTheme();
  const { anchorEl, onOpen, onClose } = useManageQuestionMenu();

  if (question?.mandatory) {
    return (
      <Container>
        <Typography sx={{ ...typography.bodyL }}>{question.webText}</Typography>
      </Container>
    );
  }

  return (
    <>
      <Container
        onClick={onOpen}
        style={{
          borderColor: question ? palette.grey[400] : palette.grey[300],
        }}
      >
        <Typography
          sx={{
            ...typography.bodyL,
            flexGrow: 1,
            color: question ? palette.text.primary : palette.grey[300],
          }}
        >
          {question?.webText || 'Add question from the list (optional)'}
        </Typography>

        <ArrowDropDownIcon />
      </Container>
      <QuestionMenu
        anchorEl={anchorEl}
        handleClose={onClose}
        onChange={onChange}
      />
    </>
  );
};

export default QuestionControl;
