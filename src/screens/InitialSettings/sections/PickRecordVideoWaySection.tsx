import { Box, Typography } from '@mui/material';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import useTheme from '../../../styles';
import ClicableContainer from '../../../components/ClickacbleContainer/ClickableContainer';
import { actions } from '../../../state';
import { VIDEO_RECORD_WAYS_RENDERERS } from '../../../recordVideoWays';

const PickRecordVideoWaySection = () => {
  const { typography, spacing, palette } = useTheme();
  const {
    textDictionary,
    videoRecordWayList,
    userChoise: { recordVideoWay },
    dispatch,
  } = useVideoRecordFlowContext();

  return (
    <Box>
      <Typography
        sx={{ ...typography.titleS, mb: spacing(6), mt: spacing(10) }}
        component="div"
      >
        {textDictionary('VideoRecordWay.Title')}
      </Typography>
      {videoRecordWayList.map((recordFlowOption) => {
        const selected = recordVideoWay === recordFlowOption;
        const RendererVideoFlow = VIDEO_RECORD_WAYS_RENDERERS[recordFlowOption];
        return (
          <ClicableContainer
            key={recordFlowOption}
            onClick={() =>
              dispatch(actions.setRecordVideoWay(recordFlowOption))
            }
            selected={selected}
            isRadio
          >
            <Typography
              component="div"
              sx={{ ...typography.bodyL, mr: spacing(8) }}
            >
              {textDictionary(
                `VideoRecordWay.Options.${recordFlowOption}.Title`,
              )}
            </Typography>
            <Typography
              component="div"
              sx={{
                mt: spacing(1),
                mr: spacing(8),
                color: palette.text.secondary,
              }}
            >
              {textDictionary(
                `VideoRecordWay.Options.${recordFlowOption}.Description`,
              )}
            </Typography>
            {selected && <RendererVideoFlow />}
          </ClicableContainer>
        );
      })}
    </Box>
  );
};

export default PickRecordVideoWaySection;
