import { useEffect, useState } from 'react';

import { CommentType, ReplyType, Type } from '../types/type';
import { useStateContext } from '../context/StateContext';
import { myuuid } from '../utils/getId';
import Button from './Button';
import '../style/add-comment.scss';

type AddCommentProps = {
  data?: ReplyType | CommentType;
  type: Type;
  close?: () => void;
};

const AddComment: React.FC<AddCommentProps> = ({ data, type, close }) => {
  const { currentUser, addComment, updateComment } = useStateContext();
  const [comment, setComment] = useState('');
  const replyingTo = `@${data?.user.username} `;

  useEffect(() => {
    if (data) {
      setComment(replyingTo);
    }
  }, [data, replyingTo]);

  const addCommentHandler = () => {
    if (comment.trim() === '') return;

    const newComment: CommentType = {
      id: myuuid,
      content: comment,
      createdAt: new Date().getTime(),
      score: 0,
      user: currentUser,
      replies: [],
    };
    addComment(newComment);
    setComment('');
  };

  const addReplyHandler = () => {
    if (comment.replace(replyingTo, '').trim() === '') return;

    const newReply: ReplyType = {
      id: myuuid,
      content: comment.replace(replyingTo, ''),
      createdAt: new Date().getTime(),
      score: 0,
      replyingTo: data?.user.username,
      user: currentUser,
      replies: [],
    };

    updateComment(type, newReply, data!.id);

    if (close) close();
  };

  return (
    <div className='add-comment grid'>
      <textarea
        className='add-comment__input'
        placeholder='Add a comment...'
        rows={3}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <div className='add-comment__img flex-align-center'>
        <img
          src={require(`../assets/avatars/${currentUser.image.png}`)}
          alt={currentUser.username}
        />
      </div>
      <div className='add-comment__actions flex-align-center'>
        {type === 'new' ? (
          <Button
            className='btn--full'
            text='Send'
            onClick={addCommentHandler}
          />
        ) : (
          <Button
            className='btn--full'
            text='Reply'
            onClick={addReplyHandler}
          />
        )}
      </div>
    </div>
  );
};

export default AddComment;
