import { NextResponse } from "next/server"
import { headers } from 'next/headers'
import { dbConnection } from "@/db"
import { User } from "@/models/User"
import { verifyToken } from "@/utils/server/jwt"

export const POST = async (req) => {
  if (!global.db) {
    await dbConnection()
    global.db = true
  }
  const cookiesList = cookies()
  const token = cookiesList.get("auth-token")
  const { verificationCode } = await req.json()

  if (!verificationCode) return NextResponse.json({ message: "Verification code is required" }, { status: 400 })

  try {
    const payload = verifyToken(token.value)
    const user = await User.findOne({ email: payload.email })

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 })
    if (!user.emailVerified) return NextResponse.json({ message: "Email not verified" }, { status: 401 })
    if (!user.phone) return NextResponse.json({ message: "Phone not found" }, { status: 404 })
    if (user.verificationCode !== verificationCode) return NextResponse.json({ message: "Invalid verification code" }, { status: 400 })

    const result = User.updateOne({ email: payload.email }, { phoneVerified: true })

    if (result.nModified === 0) return NextResponse.json({ message: "Error updating user" }, { status: 500 })

    return NextResponse.json({ message: "Phone verified" }, { status: 200 })

  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}