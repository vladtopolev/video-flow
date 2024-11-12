import { Box, Typography } from '@mui/material';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import useTheme from '../../styles';
import ClicableContainer from '../../components/ClickacbleContainer/ClickableContainer';
import { actions } from '../../state';
import { VIDEO_RECORD_WAYS_RENDERERS } from '../../recordVideoWays';
import ActionContainerRenderer from '../../components/ActionContainerRenderer/ActionContainerRenderer';

const PickRecordVideoWaySection = () => {
  const { typography, spacing, palette, breakpoints } = useTheme();
  const {
    textDictionary,
    videoRecordWayList,
    mediaStream: { stopStream },
    userChoise: { recordVideoWay, currentScreen },
    dispatch,
  } = useVideoRecordFlowContext();

  const isMobile = breakpoints.xs || breakpoints.sm;

  return (
    <>
      <Box>
        <Typography
          sx={{
            ...(isMobile ? typography.titleM : typography.titleL),
            mb: spacing(10),
          }}
          component="h1"
        >
          {textDictionary('PickVideoRecordWay.Title')}
        </Typography>
        {videoRecordWayList.map((recordFlowOption) => {
          const selected = recordVideoWay === recordFlowOption;
          const RendererVideoFlow =
            VIDEO_RECORD_WAYS_RENDERERS[recordFlowOption];
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
      <ActionContainerRenderer
        currentScreen={currentScreen}
        onStopStream={stopStream}
        buttons={{
          next: {
            onAction: () => {
              dispatch(actions.goNext());
            },
            disabled: !recordVideoWay,
          },
        }}
      />
    </>
  );
};

export default PickRecordVideoWaySection;
