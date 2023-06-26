import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { verifyToken } from "@/utils/server/jwt"

export const GET = (req) => {
  const cookiesList = cookies()
  const token = cookiesList.get('auth-token')

  const BAD_CREDENTIALS_RESPONSE = NextResponse.json(
    {
      message: "Bad credentials",
      code: 0
    }
    ,
    { status: 401 }
  )

  if (token) {
    try {
      const payload = verifyToken(token.value)
      return NextResponse.json({
        user: {
          email: payload.email,
          emailVerified: payload.emailVerified,
          phone: payload.phone,
          phoneVerified: payload.phoneVerified,
        },
        message: "Logged in"
      },
        { status: 200 }
      )
    } catch (e) {
      console.log(e)
      return BAD_CREDENTIALS_RESPONSE
    }
  } else {
    return BAD_CREDENTIALS_RESPONSE
  }

}