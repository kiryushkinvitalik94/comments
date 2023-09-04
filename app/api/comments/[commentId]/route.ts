import { NextRequest, NextResponse } from "next/server";
import { getComments, writeComments } from "data/comments.model";

import {
  serverErrorResponse,
  getFieldIsReqired,
  failedResponse,
} from "../comments.utils";

import {
  commentNotFoundErrorText,
  updatingCommentErrorText,
  commentDeleteSuccessText,
} from "../comments.constants";

export async function PUT(
  request: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const commentId = Number(params.commentId);

  const { text } = await request.json();
  if (!text || text.trim() === "") {
    return failedResponse(getFieldIsReqired("Comment text"), 400);
  }

  try {
    const comments = getComments();
    const commentToUpdate = comments.find(
      (comment) => comment.id === commentId
    );
    if (commentToUpdate) {
      commentToUpdate.text = text;
      writeComments(comments);
      return NextResponse.json(commentToUpdate, { status: 200 });
    } else {
      return failedResponse(commentNotFoundErrorText, 400);
    }
  } catch (error) {
    console.error(error);
    return serverErrorResponse(updatingCommentErrorText);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const commentId = Number(params.commentId);

  try {
    const comments = getComments();
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId
    );

    if (commentIndex === -1) {
      return failedResponse(commentNotFoundErrorText, 404);
    }

    comments.splice(commentIndex, 1);

    writeComments(comments);

    return NextResponse.json(
      { message: commentDeleteSuccessText },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return serverErrorResponse();
  }
}
