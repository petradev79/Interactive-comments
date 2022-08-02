import { useState } from 'react';
import { ReplyType, CommentType } from '../types/type';
import { useStateContext } from '../context/StateContext';
import { clockToDateString } from '../utils/getDate';

import { ReactComponent as IconPlus } from '../assets/icons/icon-plus.svg';
import { ReactComponent as IconMinus } from '../assets/icons/icon-minus.svg';
import { ReactComponent as IconReply } from '../assets/icons/icon-reply.svg';
import { ReactComponent as IconDelete } from '../assets/icons/icon-delete.svg';
import { ReactComponent as IconEdit } from '../assets/icons/icon-edit.svg';
import Button from './Button';
import AddComment from './AddComment';
import '../style/chat.scss';

type ReplyProps = {
  chatData: ReplyType;
  type: 'reply' | 'nested-reply';
};

type CommentProps = {
  chatData: CommentType;
  type: 'comment';
};

type ChatProps = ReplyProps | CommentProps;

const Chat: React.FC<ChatProps> = ({ chatData, type }) => {
  const {
    currentUser,
    editComment,
    setShowDeleteModal,
    setChosenCommentData,
    updateScore,
  } = useStateContext();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(chatData.content);

  const editCommentHandler = () => {
    editComment(type, content, chatData.id);
    setIsEditing(false);
  };

  const deleteCommentHandler = () => {
    const data = { id: chatData.id, type };
    setChosenCommentData(data);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className='chat grid'>
        <div className='chat__header flex-align-center'>
          <img
            src={require(`../assets/avatars/${chatData.user.image.png}`)}
            alt={chatData.user.username}
          />
          <h2>
            {chatData.user.username}{' '}
            {currentUser.username === chatData.user.username && (
              <span>you</span>
            )}
          </h2>

          <p>{clockToDateString(chatData.createdAt)}</p>
        </div>

        <div className='chat__content'>
          {!isEditing && (
            <>
              {type === 'reply' ? (
                <p>
                  <span>@{chatData.replyingTo}</span> {chatData.content}
                </p>
              ) : (
                <p>{chatData.content}</p>
              )}
            </>
          )}
          {isEditing && (
            <textarea
              className='add-comment__input'
              rows={3}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}
        </div>

        {isEditing && (
          <div className='chat__update'>
            <Button
              className='btn--full'
              text='Update'
              onClick={editCommentHandler}
            />
          </div>
        )}

        <div className='chat__votes flex-center'>
          <button
            className='chat__vote-btn grid-center'
            onClick={() => updateScore(chatData.id, type, 'increment')}
          >
            <IconPlus />
          </button>
          <div className='chat__score'>{chatData.score}</div>
          <button
            className='chat__vote-btn grid-center'
            onClick={() => updateScore(chatData.id, type, 'decrement')}
          >
            <IconMinus />
          </button>
        </div>
        <div className='chat__actions flex-align-center'>
          {currentUser.username === chatData.user.username ? (
            <>
              <Button
                className='btn--ghost-danger'
                text='Delete'
                onClick={deleteCommentHandler}
              >
                <IconDelete />
              </Button>
              <Button
                className='btn--ghost'
                text='Edit'
                onClick={() => setIsEditing(true)}
              >
                <IconEdit />
              </Button>
            </>
          ) : (
            <Button
              className='btn--ghost'
              text='Reply'
              onClick={() => setIsReplying(true)}
            >
              <IconReply />
            </Button>
          )}
        </div>
      </div>

      {isReplying && (
        <AddComment
          type={type}
          data={chatData}
          close={() => setIsReplying(false)}
        />
      )}
    </>
  );
};

export default Chat;
