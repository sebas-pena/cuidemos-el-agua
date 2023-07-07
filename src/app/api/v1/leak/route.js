import { NextResponse } from "next/server"
import { dbConnection } from "@/db"
import { Leak } from "@/models/Leak"
import { uploadReport } from "@/utils/server/discord"
import { User } from "@/models/User"
import { ErrorResponse } from "@/utils/server/http-errors"
import { locate } from "@/utils/server/locate"


export const GET = async (req) => {
  const { searchParams } = new URL(req.url)

  try {
    await dbConnection()
    const includeSolved = searchParams.get("solved") === "false" ? false : true

    if (includeSolved) {
      const leaks = await Leak.find({})
      const solvedLeaks = []
      const unsolvedLeaks = []

      for (const leak of leaks) {
        if (leak.closedAt) {
          solvedLeaks.push(leak)
        } else {
          unsolvedLeaks.push(leak)
        }
      }

      return NextResponse.json({
        solvedLeaks,
        unsolvedLeaks,
        totalLeaks: leaks.length,
        totalSolvedLeaks: solvedLeaks.length,
      }, { status: 200 })

    } else {
      const leaks = await Leak.find({ closedAt: null })
      return NextResponse.json({
        leaks,
        totalLeaks: leaks.length,
      }, { status: 200 })

    }

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export const POST = async (req) => {
  try {
    await dbConnection()
    const uid = req.headers.get('uid')
    const user = await User.findById(uid)

    if (!user) {
      return ErrorResponse(5)
    }

    if (user.banned) {
      return ErrorResponse(3)
    }

    if (!user.emailVerified) {
      return ErrorResponse(9)
    }

    const form = await req.formData()
    const file = form.get("file")
    const description = form.get("description")

    const lat = parseFloat(form.get("lat"))
    const lng = parseFloat(form.get("lng"))

    const locationData = await locate(lat, lng)
    const location = {
      lat,
      lng,
      ...locationData
    }

    const leak = new Leak({
      description,
      location,
      reportedBy: uid,
      reports: {
        inappropriate: [],
        fake: []
      }
    })

    const format = file.name.split(".").pop()
    const result = await uploadReport({
      location,
      file,
      description,
      filename: `${leak._id}.${format}`,
      contentType: file.type,
    })

    if (result.status !== 200) {
      return ErrorResponse(0)
    } else {
      const fileUrl = (await result.json()).attachments[0].url
      leak.file = {
        url: fileUrl,
        contentType: file.type,
      }
      await leak.save()
    }
    return NextResponse.json({
      report: leak,
    }, { status: 200 })
  } catch (error) {
    console.log(error)
    return ErrorResponse(0)
  }
}