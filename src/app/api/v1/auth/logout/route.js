import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { verifyToken } from "@/utils/server/jwt"

export const POST = (req) => {
  const cookiesList = cookies()
  const token = cookiesList.get('auth-token')

  const BAD_CREDENTIALS_RESPONSE = NextResponse.json(
    {
      message: "Bad credentials",
      code: 0
    },
    { status: 401 }
  )

  if (!token) {
    return BAD_CREDENTIALS_RESPONSE
  }

  try {
    verifyToken(token.value)
    const res = NextResponse.json({
      message: "Logged out"
    })
    res.headers.set('auth-token', null, {
      maxAge: 0,
      https: true,
    })
    return res
  } catch (e) {
    console.log(e)
    return BAD_CREDENTIALS_RESPONSE
  }

}