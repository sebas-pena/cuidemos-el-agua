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
    const { reason } = await req.json()
    if (!reason) return ErrorResponse(6)
    const reasonOfReport = reason === 1 ? 'inappropriate' : 'false'

    const res = await Leak.updateOne({ _id: leakId }, {
      $addToSet: {
        [`reports.${reasonOfReport}`]: uid
      }
    })

    if (res.n === 0) return ErrorResponse(8)

    return NextResponse.json({
      message: "Reported successfully",
      code: 1
    },
      { status: 200 }
    )

  } catch (error) {
    console.log(error)
    return ErrorResponse(0)
  }
}