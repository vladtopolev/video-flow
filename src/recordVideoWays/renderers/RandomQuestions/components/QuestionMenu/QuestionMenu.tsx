import { Menu } from '@mui/material';
import { useMemo } from 'react';
import { useVideoRecordFlowContext } from '../../../../../context/VideoRecordFlow.context';
import { QuestionConfig } from '../../../../../VideoRecordFlow.types';
import CheckedItem from './components/CheckedItem';
import EmptyItem from './components/EmptyItem';
import PossibleItem from './components/PossibleItem';

const QuestionMenu = ({
  anchorEl,
  handleClose,
  onChange,
}: {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  onChange: (question: QuestionConfig | null) => void;
}) => {
  const {
    questionList,
    userChoise: { pickedQuestions },
  } = useVideoRecordFlowContext();

  const menuQuestionList = useMemo(
    () => [
      ...pickedQuestions.filter(Boolean).map((q) => ({ ...q, selected: true })),
      ...questionList
        .filter(
          (question) => !pickedQuestions.find((q) => question.id === q.id),
        )
        .map((q) => ({ ...q, selected: false })),
    ],
    [questionList, pickedQuestions],
  );

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <EmptyItem
        onClick={() => {
          onChange(null);
          handleClose();
        }}
      />
      {menuQuestionList.map((q) =>
        q.selected ? (
          <CheckedItem question={q} key={q.id} />
        ) : (
          <PossibleItem
            question={q}
            key={q.id}
            onClick={() => {
              onChange(q);
              handleClose();
            }}
          />
        ),
      )}
    </Menu>
  );
};

export default QuestionMenu;