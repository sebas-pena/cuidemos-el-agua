import { NextResponse } from "next/server"
import { User } from "@/models/User"
import { dbConnection } from "@/db"
import { sendVerificationMail } from "@/utils/server/gmail-client"
import { createToken } from "@/utils/server/jwt"
import { hashPassword } from "@/utils/server/password"

export const POST = async (req) => {

  if (!global.db) {
    await dbConnection()
    global.db = true
  }

  const body = await req.json()
  let { email, password, phone } = body

  if (!email || !password || !phone) return NextResponse.json({ message: "email, password and phone are required" }, { status: 400 })

  const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/
  const phoneRegex = /^0?9\d{7}$/

  let hasErrros = false
  const errors = {}

  if (!emailRegex.test(email)) {
    errors.email = "email is not valid"
    hasErrros = true
  }

  if (!phoneRegex.test(phone)) {
    errors.phone = "Phone is not valid"
    hasErrros = true
  }

  if (phone.toString().startsWith("0")) {
    phone = phone.toString().substring(1)
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters"
    hasErrros = true
  }

  const usersWithSameCredentials = await User.find({
    '$or': [{ email: email }, { phone: phone }]
  })

  if (usersWithSameCredentials.length > 0) {
    errors.email = "email or phone is already taken"
    errors.phone = "email or phone is already taken"
    hasErrros = true
  }

  if (hasErrros) return NextResponse.json({ errors, message: "Invalid values" }, { status: 400 })

  const token = createToken({ email })

  try {
    await sendVerificationMail(email, token)
  } catch (e) {
    return NextResponse.json({ message: "Error sending verification email" }, { status: 500 })
  }

  const hashedPassword = await hashPassword(password)
  const newUser = new User({
    email,
    password: hashedPassword,
    phone: phone,
    phoneVerified: false,
    emailVerified: false
  })


  try {
    await newUser.save()
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Error saving user" }, { status: 500 })
  }

  return NextResponse.json({
    user: {
      email,
      phone: phone,
      isVerified: false
    }
  }, { status: 200 })
}