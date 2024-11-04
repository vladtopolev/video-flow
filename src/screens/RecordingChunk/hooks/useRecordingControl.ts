import { useCallback, useEffect, useRef, useState } from 'react';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import useMediaRecorder from './useMediaRecorder';

const BEFORE_RECORDING_COUNTDOWN_MAX = 3;

type RecordingState = {
  isRecording: boolean;
  beforeRecordingCountdownRun: boolean;
  beforeRecordingCountdown: number;
  duration: number;
};

const beforeRecordingState: RecordingState = {
  isRecording: false,
  beforeRecordingCountdownRun: false,
  beforeRecordingCountdown: 0,
  duration: 0,
};

const useRecordingControl = ({
  maxDuration,
  startRecordingAction,
  stopRecordingAction,
  reRecordAction,
}: {
  maxDuration: number;
  startRecordingAction: () => void;
  stopRecordingAction: () => void;
  reRecordAction: () => void;
}) => {
  const {
    mediaStream: { stream },
    setChunk,
    userChoise: { currentQuestionIndex },
  } = useVideoRecordFlowContext();

  const onNewChunkAdded = useCallback(
    (blob: Blob) => {
      setChunk(currentQuestionIndex, blob);
    },
    [setChunk, currentQuestionIndex],
  );

  const { mediaRecorderManageRef } = useMediaRecorder({
    stream,
    onNewChunkAdded,
  });

  const [recordingState, setRecordingState] =
    useState<RecordingState>(beforeRecordingState);

  // RECORDING
  const beforeRecordingCountdownIntervalId = useRef<NodeJS.Timeout | null>(
    null,
  );
  const clearBeforeRecordingCountdownInterval = useCallback(() => {
    if (beforeRecordingCountdownIntervalId.current) {
      clearInterval(beforeRecordingCountdownIntervalId.current);
    }
  }, []);
  const videoTickIntervalId = useRef<NodeJS.Timeout | null>(null);
  const clearVideoTickInterval = useCallback(() => {
    if (videoTickIntervalId.current) {
      clearInterval(videoTickIntervalId.current);
    }
  }, []);

  const startRecording = async () => {
    setRecordingState((prev) => ({
      ...prev,
      duration: 0,
      beforeRecordingCountdown: 0,
      beforeRecordingCountdownRun: true,
    }));
    // run before countdown for user preparation before recording
    await new Promise<void>((resolve) => {
      clearBeforeRecordingCountdownInterval();
      let count = 0;
      beforeRecordingCountdownIntervalId.current = setInterval(() => {
        count++;
        if (count > BEFORE_RECORDING_COUNTDOWN_MAX) {
          clearBeforeRecordingCountdownInterval();
          resolve();
          return;
        }
        setRecordingState((prev) => ({
          ...prev,
          beforeRecordingCountdown: count,
        }));
      }, 1000);
    });

    // after coutdown initiate recording
    setRecordingState((prev) => ({
      ...prev,
      isRecording: true,
      beforeRecordingCountdownRun: false,
    }));
    clearVideoTickInterval();

    videoTickIntervalId.current = setInterval(() => {
      setRecordingState((prev) => ({ ...prev, duration: prev.duration + 1 }));
    }, 1000);
    mediaRecorderManageRef.current?.startRecord();
    startRecordingAction();
  };

  // stop recording when duration more then maxDuration
  useEffect(() => {
    if (recordingState.duration >= maxDuration) {
      setRecordingState((prev) => ({ ...prev, isRecording: false }));
      mediaRecorderManageRef.current?.stopRecord();
      clearVideoTickInterval();
      stopRecordingAction();
    }
  }, [
    recordingState.duration,
    maxDuration,
    clearVideoTickInterval,
    mediaRecorderManageRef,
    stopRecordingAction,
  ]);

  const stopRecording = () => {
    setTimeout(() => {
      setRecordingState((prev) => ({ ...prev, isRecording: false }));
      mediaRecorderManageRef.current?.stopRecord();
      clearVideoTickInterval();
      stopRecordingAction();
    }, 800);
  };

  const onRerecord = () => {
    clearBeforeRecordingCountdownInterval();
    clearVideoTickInterval();
    mediaRecorderManageRef.current?.stopRecord();
    setRecordingState(() => beforeRecordingState);
    reRecordAction();
  };

  // clear all intervals
  useEffect(
    () => () => {
      clearBeforeRecordingCountdownInterval();
      clearVideoTickInterval();
    },
    [clearBeforeRecordingCountdownInterval, clearVideoTickInterval],
  );

  return { recordingState, startRecording, stopRecording, onRerecord };
};

export default useRecordingControl;
