import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { QuestionConfig } from '../../../VideoRecordFlow.types';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import { actions } from '../../../state';
import useTheme from '../../../styles';
import QuestionControl from './components/QuestionControl/QuestionControl';
import { FREELY_SPEECH_ID } from '../Freely/Freely';

const RandomQuestions = () => {
  const {
    dispatch,
    questionList,
    maxQuestionsCount,
    userChoise: { pickedQuestions },
  } = useVideoRecordFlowContext();
  const { spacing } = useTheme();

  const [userPickedQuestion, setUserPickedQuestion] = useState<
    Array<QuestionConfig | null>
  >(() => {
    // if user alredy picked questions and return to the initial screen again
    if (
      pickedQuestions.length > 0 &&
      pickedQuestions[0].id !== FREELY_SPEECH_ID
    ) {
      return [
        ...pickedQuestions.filter((q) => q !== null),
        ...Array(maxQuestionsCount - pickedQuestions.length).fill(null),
      ];
    }
    const mandatoryQuestions = questionList.filter(
      (question) => question.mandatory,
    );
    return [
      ...mandatoryQuestions,
      ...Array(maxQuestionsCount - mandatoryQuestions.length).fill(null),
    ];
  });

  const onChangeQuestion = (question: QuestionConfig | null, index: number) =>
    setUserPickedQuestion((prev) => {
      const newQuestions = [...prev];
      newQuestions[index] = question;
      return newQuestions;
    });

  useEffect(() => {
    dispatch(
      actions.setPickedQuestions(userPickedQuestion.filter((q) => q !== null)),
    );
  }, [userPickedQuestion, dispatch]);

  return (
    <Box
      sx={{ mt: 2 }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        style={{ gap: spacing(2), display: 'flex', flexDirection: 'column' }}
      >
        {userPickedQuestion.map((question, index) => (
          <QuestionControl
            key={index}
            question={question}
            onChange={(q) => onChangeQuestion(q, index)}
          />
        ))}
      </div>
    </Box>
  );
};

export default RandomQuestions;
