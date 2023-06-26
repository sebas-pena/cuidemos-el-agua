import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { comparePassword } from "@/utils/server/password";
import { sendVerificationMail } from "@/utils/server/gmail-client";

export const POST = async (req) => {
  if (!global.db) {
    await dbConnection()
    global.db = true
  }

  const { email, password } = await req.json()

  const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/

  if (!emailRegex.test(email) || password.length < 8) {
    return NextResponse.json(
      {
        message: "Bad credentials",
        code: 0
      }
      ,
      { status: 401 }
    )
  }

  const user = await User.findOne({ email })

  if (!user) {
    return NextResponse.json(
      {
        message: "Bad credentials",
        code: 0
      }
      ,
      { status: 401 }
    )
  }

  const isPasswordValid = await comparePassword(password, user.password)

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        message: "Bad credentials",
        code: 0
      }
      ,
      { status: 401 }
    )
  }

  if (user.emailVerified) {
    return NextResponse.json({
      message: "Email already verified",
      code: 0
    },
      { status: 401 }
    )
  }
  try {
    await sendVerificationMail(user.email)
    return NextResponse.json({
      message: "Verification mail sent",
      code: 1
    },
      { status: 200 }
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json({
      message: "Error sending verification mail",
      code: 2
    },
      { status: 500 }
    )
  }
}