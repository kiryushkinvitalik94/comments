import React from "react";
import { BsCheck, BsX } from "react-icons/bs";

export type CommentFormPropsType = {
  editedCommentText: string;
  setEditedCommentText: (value: string) => void;
  handleSubmitEditComment: VoidFunction;
  handleCancelEdit: VoidFunction;
};

export const CommentForm: React.FC<CommentFormPropsType> = ({
  editedCommentText,
  setEditedCommentText,
  handleSubmitEditComment,
  handleCancelEdit,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        className="border rounded-md px-2 py-1 w-full text-black"
        value={editedCommentText}
        onChange={(e) => setEditedCommentText(e.target.value)}
      />
      <button
        className="text-green-500 hover:text-green-600 text-2xl"
        onClick={() => handleSubmitEditComment()}
      >
        <BsCheck />
      </button>
      <button
        className="text-red-500 hover:text-red-600 text-2xl"
        onClick={() => handleCancelEdit()}
      >
        <BsX />
      </button>
    </div>
  );
};
