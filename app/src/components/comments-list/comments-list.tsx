import React, { useState, useEffect } from "react";

import { CommentModel } from "src/models/comments.model";
import CommentItem from "./comment-item";

export type CommentsListPropsType = {
  comments: CommentModel[];
  handleDeleteComment: (id: number) => void;
  handleEditComment: (updatedComment: CommentModel) => void;
};

export const CommentsList: React.FC<CommentsListPropsType> = ({
  comments,
  handleDeleteComment,
  handleEditComment,
}) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState(null);

  const handleStartEdit = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  const handleSubmitEditComment = () => {
    handleEditComment({ id: editingCommentId, text: editedCommentText });
    handleCancelEdit();
  };

  return (
    <ul className="mt-8 space-y-6">
      {!!comments.length &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            handleStartEdit={handleStartEdit}
            handleDeleteComment={handleDeleteComment}
            editingCommentId={editingCommentId}
            editedCommentText={editedCommentText}
            handleCancelEdit={handleCancelEdit}
            setEditedCommentText={setEditedCommentText}
            handleSubmitEditComment={handleSubmitEditComment}
          />
        ))}
    </ul>
  );
};
