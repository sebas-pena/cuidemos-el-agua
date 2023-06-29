import { NextResponse } from "next/server"
import { dbConnection } from "@/db"
import { Leak } from "@/models/Leak"
import { ErrorResponse } from "@/utils/server/http-errors"
import { User } from "@/models/User"

export const PUT = async (req, { params }) => {
  try {
    const uid = req.headers.get('uid')
    await dbConnection()

    const user = await User.findById(uid)

    if (!user) {
      return ErrorResponse(5)
    }
    if (user.banned) return ErrorResponse(3)

    const { id: leakId } = params
    const leak = await Leak.findById(leakId)

    if (!leak.reportedBy === user.id || !user.role === 'admin') return ErrorResponse(7)

    const res = await Leak.findOneAndUpdate(
      { _id: leakId },
      { closedAt: null },
      { new: true }
    )

    if (!res) return ErrorResponse(4)

    return NextResponse.json({
      message: "Closed successfully",
      code: 1,
      data: res
    },
      { status: 200 }
    )

  } catch (error) {
    return ErrorResponse(0)
  }
}