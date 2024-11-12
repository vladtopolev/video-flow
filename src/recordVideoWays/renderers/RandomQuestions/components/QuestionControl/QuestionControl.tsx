import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { DeleteOutline as DeleteIcon } from '@mui/icons-material';
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
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
        </Box>
        <DeleteIcon
          sx={{ color: palette.grey[500] }}
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
          }}
        />
      </Container>
      <QuestionMenu
        question={question}
        anchorEl={anchorEl}
        handleClose={onClose}
        onChange={onChange}
      />
    </>
  );
};

export default QuestionControl;
