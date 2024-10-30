import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';

const UploadingChunks = () => {
  const { dispatch } = useVideoRecordFlowContext();
  return (
    <>
      <div>Uploading Chunl</div>
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

export default UploadingChunks;
