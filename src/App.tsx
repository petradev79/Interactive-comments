import AddComment from './components/AddComment';
import Comment from './components/Comment';
import DeleteModal from './components/DeleteModal';
import { useStateContext } from './context/StateContext';

const App = () => {
  const { comments, showDeleteModal } = useStateContext();

  return (
    <>
      <div className='app grid-center'>
        <h1>Interactive comments section</h1>
        <div className='comments flex-center'>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <AddComment type='new' />
      </div>
      {showDeleteModal && <DeleteModal />}
    </>
  );
};

export default App;
