import { Box, SxProps, Typography } from '@mui/material';
import { MutableRefObject, useImperativeHandle, useRef, useState } from 'react';
import { useRecordingDialog } from '../../../../components/RecordingDialog/RecordingDialog';
import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';
import useInterval from '../../../../hooks/useInterval';
import useMeasure from '../../../../hooks/useMeasure';
import useTheme from '../../../../styles';
import { hex2rgba } from '../../../../utils';
import Controls from './components/Controls';

export type TelepromterManagerProps = {
  scrollTo: (top: number) => void;
  startScrolling: () => void;
  stopScrolling: () => void;
};
const BREAKPOINT_WIDTH = 900;

const Telepromter = ({
  question,
  notes,
  sx,
  maxHeight,
  onNotesChange,
  telepromterManagerRef,
  isChunkRecording,
}: {
  question?: string;
  notes?: string;
  sx?: SxProps;
  maxHeight?: number;
  onNotesChange?: (text: string) => void;
  isChunkRecording?: boolean;
  telepromterManagerRef?: MutableRefObject<
    TelepromterManagerProps | null | undefined
  >;
}) => {
  const { width } = useRecordingDialog();

  const { palette, spacing, corners, typography } = useTheme();
  const isMobile = width < BREAKPOINT_WIDTH;

  const {
    telepromterSettings: { fontSize, speed },
  } = useVideoRecordFlowContext();

  const [isScrolling, setScrolling] = useState(false);
  const toggleScrolling = () => setScrolling((prev) => !prev);

  const [setMeasureContainerElement, { height }] = useMeasure<HTMLDivElement>();

  const scrollingContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (top: number) => {
    if (scrollingContainerRef.current) {
      scrollingContainerRef.current.scrollTop = top;
    }
  };

  const notesTextRef = useRef(notes || '');

  useImperativeHandle(
    telepromterManagerRef,
    () => ({
      scrollTo,
      startScrolling: () => setScrolling(true),
      stopScrolling: () => setScrolling(false),
    }),
    [],
  );

  useInterval(
    () => {
      if (scrollingContainerRef.current && isScrolling) {
        scrollingContainerRef.current.scrollTop += 1;
      }
    },
    isScrolling ? 40 / (speed * 0.5) : null,
  );

  const _fontSize = isMobile ? 24 : fontSize;

  return (
    <Box
      sx={{
        p: { xs: spacing(4), md: spacing(6) },
        pb: { xs: spacing(4), md: spacing(4) },
        borderRadius: corners.md,
        background: hex2rgba(palette.background.dark_60, 0.6),
        backdropFilter: 'blur(20px)',
        color: palette.common.white,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        ...sx,
      }}
    >
      {question && (
        <Typography
          className="telepromter-question"
          sx={isMobile ? { ...typography.bodyM } : { ...typography.bodyXL }}
        >
          {question}
        </Typography>
      )}
      {notes && (
        <>
          <Box
            className="telepromter-area"
            component="div"
            sx={{
              flexGrow: 1,
              overflowY: isScrolling ? 'hidden' : 'scroll',
              ...(isMobile ? { mt: 2 } : { mt: 4 }),
              ...(maxHeight && { maxHeight }),
            }}
            ref={(element: HTMLDivElement) => {
              setMeasureContainerElement(element);
              scrollingContainerRef.current = element;
            }}
          >
            <Typography
              component="div"
              className="telepromter-text"
              sx={{
                fontSize: _fontSize,
                fontWeight: 700,
                lineHeight: '140%',
                paddingBottom: height / 2,
                position: 'relative',
                top: height / 2,
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: notesTextRef.current.replaceAll('\n', '<br>'),
                }}
                contentEditable
                style={{
                  outline: 'none',
                }}
                onInput={(e) => {
                  const element = e.target as HTMLDivElement;
                  onNotesChange?.(element.innerText);
                }}
              />
            </Typography>
          </Box>
          <Controls
            isScrolling={isScrolling}
            isChunkRecording={isChunkRecording}
            toggleScrolling={toggleScrolling}
          />
        </>
      )}
    </Box>
  );
};

export default Telepromter;
