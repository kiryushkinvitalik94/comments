import { NextResponse } from "next/server";

export const getFieldIsReqired = (fieldName) => `${fieldName} is required`;

export function failedResponse(errorMessage: string, code) {
  return NextResponse.json({ message: errorMessage }, { status: code });
}

export function serverErrorResponse(message?) {
  return NextResponse.json(
    { message: message || `Internal server error` },
    { status: 500 }
  );
}
