import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (comment: string) => void;
  onCancel: VoidFunction;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newComment);
    setNewComment("");
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Додати новий коментар
        </label>
        <div className="mt-1">
          <textarea
            id="comment"
            name="comment"
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Додати коментар
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          onClick={() => onCancel()}
        >
          Закрити
        </button>
      </div>
    </form>
  );
};
