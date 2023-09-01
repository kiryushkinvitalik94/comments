import React from "react";

import { CommentModel } from "src/models/comments.model";
import { BsTrash, BsPencil, BsCheck, BsX } from "react-icons/bs";
import CommentForm from "../comment-form";

export type CommentsItemPropsType = {
  comment: CommentModel;
  handleStartEdit: (id: number, text: string) => void;
  handleDeleteComment: (id: number) => void;
  editingCommentId: number | null;
  editedCommentText: string | null;
  handleCancelEdit: VoidFunction;
  setEditedCommentText: (value: string) => void;
  handleSubmitEditComment: VoidFunction;
};

export const CommentItem: React.FC<CommentsItemPropsType> = ({
  comment,
  handleStartEdit,
  handleDeleteComment,
  handleCancelEdit,
  editingCommentId,
  editedCommentText,
  setEditedCommentText,
  handleSubmitEditComment,
}) => {
  const { id } = comment;

  return (
    <li className="bg-gray-50 p-6 shadow-lg sm:rounded-3xl relative">
      {editingCommentId === id ? (
        <CommentForm
          editedCommentText={editedCommentText}
          handleCancelEdit={handleCancelEdit}
          setEditedCommentText={setEditedCommentText}
          handleSubmitEditComment={handleSubmitEditComment}
        />
      ) : (
        <>
          <p className="text-gray-600">{comment.text}</p>
          <div className="absolute top-2 right-2 space-x-1">
            <button
              className="text-gray-400 hover:text-blue-600"
              onClick={() => handleStartEdit(id, comment.text)}
            >
              <BsPencil />
            </button>
            <button
              className="text-gray-400 hover:text-red-600"
              onClick={() => handleDeleteComment(id)}
            >
              <BsTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
};
