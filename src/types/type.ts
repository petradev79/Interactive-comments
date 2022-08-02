export type Type = 'reply' | 'comment' | 'new' | 'nested-reply';
export type Operation = 'increment' | 'decrement';

export type UserType = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type ReplyType = {
  id: number | string;
  content: string;
  createdAt: number;
  score: number;
  replyingTo?: string;
  user: UserType;
  replies: ReplyType[];
};

export type CommentType = {
  id: number | string;
  content: string;
  createdAt: number;
  score: number;
  user: UserType;
  replies: ReplyType[];
};

export type StateContextType = {
  comments: CommentType[];
  currentUser: UserType;
  setCurrentUser: (currentUser: UserType) => void;
  addComment: (newComment: CommentType) => void;
  updateComment: (type: Type, newReply: ReplyType, id: string | number) => void;
  editComment: (type: Type, newContent: string, id: string | number) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (showDeletedeModal: boolean) => void;
  chosenCommentData: { id: string | number; type: Type };
  setChosenCommentData: (data: { id: string | number; type: Type }) => void;
  deleteComment: () => void;
  updateScore: (id: string | number, type: Type, operation: Operation) => void;
};
