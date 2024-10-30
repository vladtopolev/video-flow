import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import { actions } from '../../../state';

// TODO
const RandomQuestions = () => {
  const {
    dispatch,
    questionList,
    userChoise: { questionsTeleprompterNotes },
  } = useVideoRecordFlowContext();
  useEffect(() => {
    console.log('==>', questionList);
    dispatch(actions.setPickedQuestions(questionList.slice(0, 3)));
  }, [dispatch, questionList]);

  console.log(questionsTeleprompterNotes);
  return (
    <Box sx={{ mt: 2 }}>
      Test
      {/*
      <Grid container spacing={4}>
        {randomisedQuestions.map((question, index) => {
          const disabled =
            totalSelected >= requiredNumberSelectedQuestions &&
            !question.checked &&
            !question.mandatory;
          const selected = question.mandatory || question.checked;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ClicableContainer
                sx={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: { sm: 130 },
                }}
                onClick={() => {
                  if (!question.mandatory) {
                    changeQuestion(index, { checked: !question.checked });
                  }
                }}
                selected={selected}
                disabled={disabled}
              >
                <Typography
                  variant="titleXS"
                  sx={{
                    flexGrow: 1,
                    ...(disabled && { color: 'text.disabled' }),
                  }}
                >
                  {question.webText}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {!selected && !disabled && (
                    <IconButton
                      sx={{
                        backgroundColor: 'common.white',
                        width: 32,
                        height: 32,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        refreshQuestion(index);
                      }}
                    >
                      <RefreshIcon
                        sx={{ color: 'primary.dark', fontSize: 20 }}
                      />
                    </IconButton>
                  )}
                </Box>
              </ClicableContainer>
            </Grid>
          );
        })}
      </Grid>*/}
    </Box>
  );
};

export default RandomQuestions;
