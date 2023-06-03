import { NextResponse } from "next/server"
import { dbConnection } from "@/db"

export const GET = async (req, res) => {
  if (!global.db) {
    await dbConnection()
    global.db = true
  }
}

export const POST = async (req, res) => {
  if (!global.db) {
    await dbConnection()
    global.db = true
  }
}

export const PUT = async (req, res) => {
  if (!global.db) {
    await dbConnection()
    global.db = true
  }
}