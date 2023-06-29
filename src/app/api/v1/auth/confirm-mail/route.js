import { NextResponse } from "next/server"
import { headers } from 'next/headers'
import { dbConnection } from "@/db"
import { User } from "@/models/User"
import { verifyToken } from "@/utils/server/jwt"

export const POST = async (req) => {
  await dbConnection()
  const headersList = headers()
  const token = headersList.get("authorization").split(" ")[1]

  try {
    const payload = verifyToken(token)
    await User.updateOne(
      { email: payload.email },
      { emailVerified: true },
      { new: true }
    )
    return NextResponse.json({ message: "Email verified" }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}