import { NextResponse } from "next/server"
import { dbConnection } from "@/db"
import { ErrorResponse } from "@/utils/server/http-errors"
import { User } from "@/models/User"

export const POST = async (req) => {
  try {
    const uid = req.headers.get('uid')
    const { uid: bannedUid } = req.query
    await dbConnection()

    const user = await User.findById(uid)

    if (!user) {
      return ErrorResponse(5)
    }

    if (user.banned) return ErrorResponse(3)
    if (user.role !== 'admin') return ErrorResponse(7)

    const res = await User.updateOne({ _id: bannedUid }, { banned: true })
    if (res.nModified === 0) return ErrorResponse(5)

    return NextResponse.json({
      message: "User banned",
      code: 1
    }, {
      status: 200
    })

  } catch (error) {
    console.log(error)
    return ErrorResponse(0)
  }
}