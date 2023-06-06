import { NextResponse } from "next/server"
import { dbConnection } from "@/db"
import { Leak } from "@/models/Leak"
import { uploadReport } from "@/utils/server/discord"

export const GET = async (req, res) => {
  try {
    if (!global.db) {
      await dbConnection()
      global.db = true
    }
    const leaks = await Leak.find({})
    return NextResponse.json(leaks, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export const POST = async (req, res) => {
  try {
    if (!global.db) {
      await dbConnection()
      global.db = true
    }
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
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export const PUT = async (req, res) => {
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