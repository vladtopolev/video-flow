import { Typography } from '@mui/material';
import useTheme from '../../styles';
import FileDropZone from '../../components/FileDropZone/FileDropZone';
import ActionContainerRenderer from '../../components/ActionContainerRenderer/ActionContainerRenderer';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';
import { useCallback, useEffect, useState } from 'react';
import FileUploadInfo from '../../components/FileUploadInfo/FileUploadInfo';
import { VideoRecordWayTypes } from '../../recordVideoWays';

const UploadOwnVideo = () => {
  const { typography, spacing } = useTheme();
  const {
    dispatch,
    fileUploader,
    onFinished,
    mediaStream: { stopStream },
    userChoise: { currentScreen },
  } = useVideoRecordFlowContext();

  const [state, setState] = useState<null | {
    file: File;
    progress: number;
    abortController: AbortController;
  }>(null);

  const file = state?.file;
  const abortController = state?.abortController;

  const uploadFile = useCallback(
    (file: File, abortController: AbortController) => {
      if (fileUploader) {
        fileUploader({
          file,
          abortController,
          onProgress: (uploded, total) => {
            if (!abortController.signal.aborted) {
              setState((prev) => ({
                ...prev!,
                progress: (uploded / total) * 100,
              }));
            }
          },
        }).then((video) => {
          if (!abortController.signal.aborted) {
            onFinished({
              recordVideoWay: VideoRecordWayTypes.UPLOAD_VIDEO,
              video,
            });
          }
        });
      }
    },
    [fileUploader, onFinished],
  );

  return (
    <>
      <div>
        <Typography sx={{ ...typography.titleL, mb: spacing(10) }}>
          Upload my own video
        </Typography>
        {!state?.file && (
          <FileDropZone
            onChange={(files) => {
              const abortController = new AbortController();
              setState({
                file: files[0],
                progress: 0,
                abortController,
              });
              uploadFile(files[0], abortController);
            }}
          />
        )}
        {file && (
          <FileUploadInfo
            file={file}
            progress={state?.progress}
            onCancel={() => {
              setState((prev) => {
                prev?.abortController.abort();
                return null;
              });
            }}
          />
        )}
      </div>
      <ActionContainerRenderer
        currentScreen={currentScreen}
        onStopStream={stopStream}
        buttons={{
          back: {
            onAction: () => {
              setState((prev) => {
                prev?.abortController.abort();
                return null;
              });
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

export default UploadOwnVideo;
