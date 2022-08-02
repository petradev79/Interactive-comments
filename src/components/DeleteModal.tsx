import { useStateContext } from '../context/StateContext';
import Button from './Button';
import '../style/delete-modal.scss';

const DeleteModal = () => {
  const { setShowDeleteModal, deleteComment } = useStateContext();

  return (
    <div className='delete-modal grid-center'>
      <div className='delete-modal__box flex'>
        <div className='delete-modal__title'>Delete comment</div>
        <div className='delete-modal__text'>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </div>
        <div className='delete-modal__actions flex-center'>
          <Button
            className='btn--full-info'
            text='No, cancel'
            onClick={() => setShowDeleteModal(false)}
          />
          <Button
            className='btn--full-danger'
            text='Yes, delete'
            onClick={deleteComment}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
