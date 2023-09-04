"use client";

import React, { useState, useEffect } from "react";

import { CommentModel } from "src/models/comments.model";
import {
  getCommentsHttpRequest,
  addCommentHttpRequest,
  deleteCommentHttpRequest,
  updateCommentHttpRequest,
} from "src/api";
import { CommentForm, Notification, CommentsList } from "src/components";
import { NotificationTypes } from "src/types";
import { NotificationStateType } from "src/components/notification";

export type CommentsPagePropsType = {};

const CommentsPage: React.FC<CommentsPagePropsType> = ({}) => {
  const [comments, setComments] = useState<CommentModel[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const json = await getCommentsHttpRequest();
        setComments(json);
      } catch (error) {
        showErrorNotification(error.message);
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, []);

  const [notification, setNotification] =
    useState<NotificationStateType | null>(null);
  const [showForm, setShowForm] = useState(false);

  const showErrorNotification = (message: string) => {
    setNotification({ message, type: NotificationTypes.error });
  };

  const showSuccessNotification = (message: string) => {
    setNotification({ message, type: NotificationTypes.success });
  };

  const handleAddComment = async (commentText: string) => {
    setShowForm(false);
    try {
      const newComment = await addCommentHttpRequest({ text: commentText });
      setComments((prevComments) => [...prevComments, newComment]);
      showSuccessNotification("Comment added successfully");
    } catch (error) {
      showErrorNotification(error.message);
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentHttpRequest(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment: CommentModel) => comment.id !== commentId)
      );
      showSuccessNotification("Comment deleted successfully");
    } catch (error) {
      showErrorNotification(error.message);
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (updatedComment: CommentModel) => {
    const { id, text } = updatedComment;
    try {
      await updateCommentHttpRequest(updatedComment);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, text } : comment
        )
      );
      showSuccessNotification("Comment edited successfully");
    } catch (error) {
      showErrorNotification(error.message);
      console.error("Error editing comment:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Коментарі
            </h1>
            <CommentsList
              comments={comments}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
            />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Сховати форму" : "Додати коментар"}
            </button>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black opacity-50 fixed inset-0"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <CommentForm
              onSubmit={handleAddComment}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default CommentsPage;
