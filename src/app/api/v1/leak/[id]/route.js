import { NextResponse } from "next/server"
import { dbConnection } from "@/db"
import { Leak } from "@/models/Leak"
import { ErrorResponse } from "@/utils/server/http-errors"
import { User } from "@/models/User"

export const DELETE = async (req, { params }) => {
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

    const res = await Leak.deleteOne({ _id: leakId })

    return NextResponse.json({
      message: 'Leak deleted successfully',
      code: 1,
    },
      { status: 200 }
    )

  } catch (e) {
    console.log(e)
    return ErrorResponse(0)
  }
}