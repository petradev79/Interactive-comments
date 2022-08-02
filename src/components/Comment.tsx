import { Fragment } from 'react';
import { CommentType } from '../types/type';

import Chat from './Chat';

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <>
      <Chat key={comment.id} chatData={comment} type='comment' />
      {comment.replies.length > 0 && (
        <div className='replies flex-center'>
          {comment.replies.map((reply) => (
            <Fragment key={reply.id}>
              <Chat chatData={reply} type='reply' />
              {reply.replies.length > 0 && (
                <div className='replies flex-center'>
                  {reply.replies.map((data) => (
                    <Chat key={data.id} chatData={data} type='nested-reply' />
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;
