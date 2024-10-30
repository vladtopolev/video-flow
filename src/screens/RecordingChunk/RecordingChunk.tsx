import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';

const RecordingChunk = () => {
  const { dispatch } = useVideoRecordFlowContext();
  return (
    <>
      <div>Recording Chunl</div>
      <div>
        <button
          onClick={() => {
            dispatch(actions.goPrev());
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            dispatch(actions.goNext());
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default RecordingChunk;
