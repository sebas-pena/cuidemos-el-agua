import { NextResponse } from "next/server"
import { dbConnection } from "@/db"
import { Leak } from "@/models/Leak"
import { uploadReport } from "@/utils/server/discord"
import { cookies } from "next/headers"
import { verifyToken } from "@/utils/server/jwt"

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  try {

    if (!global.db) {
      await dbConnection()
      global.db = true
    }

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

    if (!global.db) {
      await dbConnection()
      global.db = true
    }

    const cookiesList = cookies()
    const token = cookiesList.get("auth-token")

    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    try {
      const payload = verifyToken(token.value)
      const form = await req.formData()
      const image = form.get("file")
      const description = form.get("description")
      const location = {
        lat: parseFloat(form.get("lat")),
        lng: parseFloat(form.get("lng")),
      }
      const leak = new Leak({
        description,
        location,
        image,
      })
      const format = image.name.split(".").pop()
      const result = await uploadReport({
        location,
        image,
        description,
        filename: `${leak._id}.${format}`,
        contentType: image.type,
      })

      if (result.status !== 200) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
      } else {
        const imageUrl = (await result.json()).attachments[0].url
        leak.image = imageUrl
        await leak.save()
      }
      return NextResponse.json({
        report: leak,
      }, { status: 200 })
    } catch (e) {
      console.log(e)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export const PUT = async (req) => {
  try {
    if (!global.db) {
      await dbConnection()
      global.db = true
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}