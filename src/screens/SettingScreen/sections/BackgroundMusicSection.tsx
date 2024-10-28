import { Grid, Typography, Box } from '@mui/material';
import { VolumeOff } from '@mui/icons-material';
import AudioPlayer from '../../../components/AudioPlayer/AudioPlayer';
import ClicableContainer from '../../../components/ClickacbleContainer/ClickableContainer';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import { actions } from '../../../state';
import useTheme from '../../../styles';

const BackgroundMusicSection = () => {
  const { textDictionary, backgroundMusicList, userChoise, dispatch } =
    useVideoRecordFlowContext();
  const { typography, spacing, corners, palette } = useTheme();

  const pickedBackgroundMusic = userChoise.music;
  const { setMusic } = actions;

  return (
    <Box className="BackgroundMusicSection">
      <Typography sx={{ ...typography.titleS, mt: spacing(10) }} component="h2">
        {textDictionary('BackgroundMusic.Title')}
      </Typography>
      <Typography
        sx={{ ...typography.bodyM, mb: spacing(6), mt: spacing(1) }}
        component="div"
      >
        {textDictionary('BackgroundMusic.Subtitle')}
      </Typography>

      <Grid container spacing={spacing(2)}>
        {backgroundMusicList.map((musicItem) => (
          <Grid item xs={6} sm={3} key={musicItem.name}>
            <ClicableContainer
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
          </Grid>
        ))}
      </Grid>

      <ClicableContainer
        sx={{ mt: spacing(2) }}
        onClick={() => {
          dispatch(actions.setMusic(null));
        }}
        selected={userChoise.music === null}
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
  );
};

export default BackgroundMusicSection;
