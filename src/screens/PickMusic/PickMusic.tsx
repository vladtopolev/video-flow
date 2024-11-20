import { VolumeOff } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import ClicableContainer from '../../components/ClickacbleContainer/ClickableContainer';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';
import useTheme from '../../styles';

const PickMusic = () => {
  const {
    textDictionary,
    backgroundMusicList,
    mediaStream: { stopStream },
    userChoise: { music, currentScreen },
    dispatch,
    ActionContainerRenderer,
  } = useVideoRecordFlowContext();
  const { typography, spacing, corners, palette, breakpoints } = useTheme();
  const isMobile = breakpoints.xs || breakpoints.sm;

  const pickedBackgroundMusic = music;
  const { setMusic } = actions;

  return (
    <>
      <Box className="BackgroundMusicSection">
        <Typography
          sx={{
            ...(isMobile ? typography.titleM : typography.titleL),
            mt: spacing(10),
          }}
          component="h2"
        >
          {textDictionary('BackgroundMusic.Title')}
        </Typography>
        <Typography
          sx={{ ...typography.bodyXL, mt: spacing(6) }}
          component="div"
        >
          {textDictionary('BackgroundMusic.Subtitle')}
        </Typography>
        <div
          style={{
            marginTop: spacing(10),
            display: 'flex',
            gap: spacing(4),
            flexDirection: 'column',
          }}
        >
          {backgroundMusicList.map((musicItem) => (
            <ClicableContainer
              key={musicItem.name}
              onClick={() => {
                dispatch(setMusic(musicItem));
              }}
              selected={pickedBackgroundMusic?.src === musicItem.src}
              isRadio
              sx={{ p: spacing(2), pr: spacing(16), mb: 0 }}
            >
              <AudioPlayer
                src={musicItem.src}
                title={musicItem.name}
                coverSrc={musicItem.coverSrc}
              />
            </ClicableContainer>
          ))}
          <ClicableContainer
            isRadio
            onClick={() => {
              dispatch(actions.setMusic(null));
            }}
            selected={pickedBackgroundMusic === null}
          >
            <div style={{ minHeight: 48, display: 'flex' }}>
              <div
                style={{
                  minWidth: 48,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: palette.grey[100],
                  borderRadius: corners.sm,
                }}
              >
                <VolumeOff sx={{ color: palette.grey[500] }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: spacing(4),
                }}
              >
                <Typography sx={{ ...typography.bodyL }}>
                  {textDictionary('BackgroundMusic.NoMusicOptions.Title')}
                </Typography>
              </div>
            </div>
          </ClicableContainer>
        </div>
      </Box>
      <ActionContainerRenderer
        currentScreen={currentScreen}
        onStopStream={stopStream}
        buttons={{
          back: {
            onAction: () => {
              dispatch(actions.goPrev());
            },
          },
          next: {
            onAction: () => {
              dispatch(actions.goNext());
            },
          },
        }}
      />
    </>
  );
};

export default PickMusic;
