import { createContext, useContext, useEffect, useState } from 'react';

import {
  StateContextType,
  CommentType,
  Type,
  ReplyType,
  Operation,
} from '../types/type';

import commentsData from '../data/data.json';

type StateContextProviderProps = {
  children: React.ReactNode;
};

export const StateContext = createContext({} as StateContextType);

export const StateContextProvider = ({
  children,
}: StateContextProviderProps) => {
  const [comments, setComments] = useState([] as CommentType[]);
  const [currentUser, setCurrentUser] = useState(commentsData.currentUser);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chosenCommentData, setChosenCommentData] = useState(
    {} as { id: string | number; type: Type }
  );

  useEffect(() => {
    setComments(commentsData.comments);
  }, []);

  const addComment = (newComment: CommentType) => {
    setComments([newComment, ...comments]);
  };

  const updateComment = (
    type: Type,
    newReply: ReplyType,
    id: string | number
  ) => {
    let updatedComments;

    if (type === 'comment') {
      updatedComments = comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, replies: [newReply, ...comment.replies] };
        } else {
          return comment;
        }
      });
      setComments(updatedComments);
    }

    if (type === 'reply') {
      updatedComments = comments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === id) {
              return { ...reply, replies: [newReply, ...reply.replies] };
            } else {
              return reply;
            }
          }),
        };
      });
      setComments(updatedComments);
    }
  };

  const editComment = (type: Type, newContent: string, id: string | number) => {
    let updatedComments;

    if (type === 'comment') {
      updatedComments = comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, content: newContent };
        } else {
          return comment;
        }
      });
      setComments(updatedComments);
    }

    if (type === 'reply') {
      updatedComments = comments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === id) {
              return { ...reply, content: newContent };
            } else {
              return {
                ...reply,
                replies: reply.replies.map((data) => {
                  if (data.id === id) {
                    return { ...data, content: newContent };
                  } else {
                    return data;
                  }
                }),
              };
            }
          }),
        };
      });
      setComments(updatedComments);
    }
  };

  const deleteComment = () => {
    const { id, type } = chosenCommentData;
    let updatedComments;

    if (type === 'comment') {
      updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
    }

    if (type === 'reply') {
      updatedComments = comments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== id),
        };
      });
      setComments(updatedComments);
    }

    if (type === 'nested-reply') {
      updatedComments = comments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            return {
              ...reply,
              replies: reply.replies.filter((data) => data.id !== id),
            };
          }),
        };
      });
      setComments(updatedComments);
    }
    setShowDeleteModal(false);
  };

  const updateScore = (
    id: string | number,
    type: Type,
    operation: Operation
  ) => {
    let updatedComments;

    if (type === 'comment') {
      updatedComments = comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            score:
              operation === 'increment' ? comment.score + 1 : comment.score - 1,
          };
        } else {
          return comment;
        }
      });
      setComments(updatedComments);
    }

    if (type === 'reply') {
      updatedComments = comments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === id) {
              return {
                ...reply,
                score:
                  operation === 'increment' ? reply.score + 1 : reply.score - 1,
              };
            } else {
              return reply;
            }
          }),
        };
      });
      setComments(updatedComments);
    }

    if (type === 'nested-reply') {
      updatedComments = comments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            return {
              ...reply,
              replies: reply.replies.map((data) => {
                if (data.id === id) {
                  return {
                    ...data,
                    score:
                      operation === 'increment'
                        ? data.score + 1
                        : data.score - 1,
                  };
                } else {
                  return data;
                }
              }),
            };
          }),
        };
      });
      setComments(updatedComments);
    }
  };

  return (
    <StateContext.Provider
      value={{
        comments,
        currentUser,
        setCurrentUser,
        addComment,
        updateComment,
        editComment,
        showDeleteModal,
        setShowDeleteModal,
        chosenCommentData,
        setChosenCommentData,
        deleteComment,
        updateScore,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
