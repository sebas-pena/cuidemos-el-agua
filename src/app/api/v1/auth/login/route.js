import { User } from "@/models/User"
import { createToken } from "@/utils/server/jwt"
import { comparePassword } from "@/utils/server/password"
import { NextResponse } from "next/server"

export const POST = async (req) => {
  const { email, password } = await req.json()

  const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/

  if (!emailRegex.test(email) || password.length < 8) {
    console.log("Invalid password or email")
    return NextResponse.json({ message: "Bad credentials" }, { status: 401 })
  }

  const user = await User.findOne({ email })

  if (!user) {
    console.log("User not found")
    return NextResponse.json({ message: "Bad credentials" }, { status: 401 })
  }

  const isPasswordValid = await comparePassword(password, user.password)

  if (!isPasswordValid) {
    console.log("Invalid password")
    return NextResponse.json({ message: "Bad credentials" }, { status: 401 })
  }

  const res = NextResponse.json({ message: "Logged in" }, { status: 200 })
  const token = createToken({
    email: user.email,
    emailVerified: user.emailVerified,
    phone: user.phone,
    phoneVerified: user.phoneVerified,
  })

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  })

  return res
}