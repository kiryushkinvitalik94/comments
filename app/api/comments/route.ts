import { NextRequest, NextResponse } from "next/server";
import { getComments, writeComments } from "data/comments.model";

import {
  serverErrorResponse,
  getFieldIsReqired,
  failedResponse,
} from "./comments.utils";

import {
  commentExistErrorText,
  commentNotFoundErrorText,
  updatingCommentErrorText,
  commentDeleteSuccessText,
} from "./comments.constants";

export async function GET(request: NextRequest) {
  try {
    const comments = getComments();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error(error);
    return serverErrorResponse();
  }
}

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (!text) {
    return failedResponse(getFieldIsReqired("Text"), 400);
  }

  try {
    const comments = getComments();

    if (comments.some((comment) => comment.text === text)) {
      return failedResponse(commentExistErrorText, 400);
    }

    const newComment = {
      id: comments.length + 1,
      text,
    };

    comments.push(newComment);

    writeComments(comments);
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return serverErrorResponse();
  }
}

export async function PUT(request: NextRequest) {
  const { text, id } = await request.json();
  if (!text || text.trim() === "") {
    return failedResponse(getFieldIsReqired("Comment text"), 400);
  }
  if (!id) {
    return failedResponse(getFieldIsReqired("Comment id"), 400);
  }
  try {
    const comments = getComments();
    const commentToUpdate = comments.find((comment) => comment.id === id);
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

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return failedResponse(getFieldIsReqired("ID"), 400);
  }

  try {
    const comments = getComments();
    const commentIndex = comments.findIndex((comment) => comment.id === id);

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
