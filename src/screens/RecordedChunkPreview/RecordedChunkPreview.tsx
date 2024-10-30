import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';

const RecordedChunkPreview = () => {
  const { dispatch } = useVideoRecordFlowContext();
  return (
    <>
      <div>Recording Chunk Preview</div>
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

export default RecordedChunkPreview;
