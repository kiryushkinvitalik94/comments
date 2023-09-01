// pages/api/comments.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { CommentModel } from "src/models/comments.model";
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

const COMMENTS_FILE_PATH = path.join(
  process.cwd(),
  "/app/data",
  "comments.json"
);

function readCommentsFile() {
  const commentsData = fs.readFileSync(COMMENTS_FILE_PATH, "utf-8");
  return JSON.parse(commentsData) as CommentModel[];
}

function writeCommentsFile(comments: CommentModel[]) {
  fs.writeFileSync(
    COMMENTS_FILE_PATH,
    JSON.stringify(comments, null, 2),
    "utf-8"
  );
}

export async function GET(request: NextRequest) {
  try {
    const comments = readCommentsFile();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return serverErrorResponse();
  }
}

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (!text) {
    return failedResponse(getFieldIsReqired("Text"), 400);
  }

  try {
    const comments = readCommentsFile();

    if (comments.some((comment) => comment.text === text)) {
      return failedResponse(commentExistErrorText, 400);
    }

    const newComment = {
      id: comments.length + 1,
      text,
    };

    comments.push(newComment);

    writeCommentsFile(comments);
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
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
    const comments = readCommentsFile();
    const commentToUpdate = comments.find((comment) => comment.id === id);
    if (commentToUpdate) {
      commentToUpdate.text = text;
      writeCommentsFile(comments);
      return NextResponse.json(commentToUpdate, { status: 200 });
    } else {
      return failedResponse(commentNotFoundErrorText, 400);
    }
  } catch {
    return serverErrorResponse(updatingCommentErrorText);
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return failedResponse(getFieldIsReqired("ID"), 400);
  }

  try {
    const comments = readCommentsFile();
    const commentIndex = comments.findIndex((comment) => comment.id === id);

    if (commentIndex === -1) {
      return failedResponse(commentNotFoundErrorText, 404);
    }

    comments.splice(commentIndex, 1);

    writeCommentsFile(comments);

    return NextResponse.json(
      { message: commentDeleteSuccessText },
      { status: 200 }
    );
  } catch (error) {
    return serverErrorResponse();
  }
}
