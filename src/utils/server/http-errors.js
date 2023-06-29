import { NextResponse } from "next/server"

const errors = [
  {
    message: "Internal server error",
    status: 500
  },
  {
    message: "Access denied: token is invalid",
    status: 401
  },
  {
    message: "Access denied: you are not logged in",
    status: 401
  },
  {
    message: "Access denied: you are banned",
    status: 401
  },
  {
    message: "Bad credentials",
    status: 401
  },
  {
    message: "User not found",
    status: 404
  },
  {
    message: "Bad request",
    status: 400
  },
  {
    message: "Access denied: privilege is not enough",
    status: 401
  },
  {
    message: "Leak not found",
    status: 404
  },
  {
    message: "Access denied: need to verify email",
    status: 401
  }
]

export const ErrorResponse = (code) => {
  if (code === undefined || typeof code !== "number" || !errors[code]) throw new Error("Invalid error code")
  const { message, status } = errors[code]
  return NextResponse.json({
    message,
    code
  },
    { status }
  )
}