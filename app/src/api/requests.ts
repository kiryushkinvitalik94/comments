import ApiBuilder from "./apiBuilder";
import {
  CommentRequestType,
  CommentModel,
  DeleteCommentRequestType,
} from "src/models/comments.model";

const apiBuilder = new ApiBuilder();

export const getCommentsHttpRequest = apiBuilder.get<CommentModel[] | []>(
  "/api/comments"
);

export const addCommentHttpRequest = apiBuilder.post<
  CommentRequestType,
  CommentModel
>("/api/comments");

export const deleteCommentHttpRequest = apiBuilder.delete<
  DeleteCommentRequestType,
  void
>("/api/comments");

export const updateCommentHttpRequest = apiBuilder.put<
  CommentModel,
  CommentModel
>("/api/comments");
