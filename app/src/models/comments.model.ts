export type CommentModel = {
  id: number;
  text: string;
};

export type CommentRequestType = {
  text: string;
};

export type DeleteCommentRequestType = {
  id: number;
};

export type CommentsModel = [] | Comment[];
