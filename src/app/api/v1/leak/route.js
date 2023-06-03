import { NextResponse } from "next/server"
import { dbConnection } from "@/db"
import { Leak } from "@/models/Leak"

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