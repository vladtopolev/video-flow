import { VolumeOff } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import ClicableContainer from '../../components/ClickacbleContainer/ClickableContainer';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';
import useTheme from '../../styles';
import ActionContainerRenderer from '../../components/ActionContainerRenderer/ActionContainerRenderer';

const PickMusic = () => {
  const {
    textDictionary,
    backgroundMusicList,
    mediaStream: { stopStream },
    userChoise: { music, currentScreen },
    dispatch,
  } = useVideoRecordFlowContext();
  const {
    typography,
    spacing,
    corners,
    palette,
    breakpoints: { sm, md, lg },
  } = useTheme();

  const pickedBackgroundMusic = music;
  const { setMusic } = actions;

  return (
    <>
      <Box className="BackgroundMusicSection">
        <Typography
          sx={{ ...typography.titleS, mt: spacing(10) }}
          component="h2"
        >
          {textDictionary('BackgroundMusic.Title')}
        </Typography>
        <Typography
          sx={{ ...typography.bodyM, mb: spacing(6), mt: spacing(1) }}
          component="div"
        >
          {textDictionary('BackgroundMusic.Subtitle')}
        </Typography>
        <div
          style={{
            display: 'grid',
            gap: spacing(2),
            gridTemplateColumns: '1fr',
            ...(sm && { gridTemplateColumns: '1fr 1fr' }),
            ...(md && { gridTemplateColumns: '1fr 1fr 1fr' }),
            ...(lg && { gridTemplateColumns: '1fr 1fr 1fr 1fr' }),
          }}
        >
          {backgroundMusicList.map((musicItem) => (
            <ClicableContainer
              key={musicItem.name}
              onClick={() => {
                dispatch(setMusic(musicItem));
              }}
              selected={pickedBackgroundMusic?.src === musicItem.src}
              sx={{ p: 2, mb: 0 }}
            >
              <AudioPlayer
                src={musicItem.src}
                title={musicItem.name}
                coverSrc={musicItem.coverSrc}
              />
            </ClicableContainer>
          ))}
        </div>

        <ClicableContainer
          sx={{ mt: spacing(2) }}
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
