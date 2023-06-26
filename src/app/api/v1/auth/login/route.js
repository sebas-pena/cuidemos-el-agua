import { User } from "@/models/User"
import { createToken } from "@/utils/server/jwt"
import { comparePassword } from "@/utils/server/password"
import { NextResponse } from "next/server"

export const POST = async (req) => {
  const { email, password } = await req.json()
  const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/

  const BAD_CREDENTIALS_RESPONSE = NextResponse.json(
    {
      message: "Bad credentials",
      code: 0
    }
    ,
    { status: 401 }
  )

  if (!emailRegex.test(email) || password.length < 8) {
    return BAD_CREDENTIALS_RESPONSE
  }

  const user = await User.findOne({ email })

  if (!user) {
    return BAD_CREDENTIALS_RESPONSE
  }

  const isPasswordValid = await comparePassword(password, user.password)

  if (!isPasswordValid) {
    return BAD_CREDENTIALS_RESPONSE
  }

  if (!user.emailVerified) {
    return NextResponse.json({
      message: "Email not verified",
      code: 1
    },
      { status: 401 }
    )
  }

  const res = NextResponse.json({
    user: {
      email: user.email,
      emailVerified: user.emailVerified,
      phone: user.phone,
      phoneVerified: user.phoneVerified,
    },
    message: "Logged in"
  },
    { status: 200 }
  )

  const token = createToken({
    email: user.email,
    emailVerified: user.emailVerified,
    phone: user.phone,
    phoneVerified: user.phoneVerified,
  })

  res.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  })

  return res
}