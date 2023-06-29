import { NextResponse } from "next/server"
import { dbConnection } from "@/db"
import { User } from "@/models/User"
import { ErrorResponse } from "@/utils/server/http-errors"

export const GET = async (req) => {
  try {
    const uid = req.headers.get('uid')
    await dbConnection()

    const user = await User.findById(uid)

    if (!user) {
      return ErrorResponse(5)
    }

    if (user.banned) return ErrorResponse(3)

    const userWithoutPassword = {
      email: user.email,
      emailVerified: user.emailVerified,
      phone: user.phone,
      phoneVerified: user.phoneVerified,
      id: user.id,
      role: user.role,
      banned: user.banned,
    }

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Logged in"
    },
      { status: 200 }
    )
  } catch (e) {
    console.log(e)
    return ErrorResponse(0)
  }
}