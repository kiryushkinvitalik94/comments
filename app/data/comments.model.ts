import fs from "fs";
import path from "path";
import { CommentModel } from "src/models/comments.model";

const COMMENTS_FILE_PATH = path.join(
  process.cwd(),
  "app/data",
  "comments.json"
);

let commentsData = JSON.parse(
  fs.readFileSync(COMMENTS_FILE_PATH, "utf-8")
) as CommentModel[];

export function getComments() {
  return commentsData;
}

export function writeComments(comments: CommentModel[]) {
  commentsData = comments;
}
