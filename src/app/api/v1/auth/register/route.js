import { User } from "@/models/User"
import { hashPassword } from "@/utils/server/password"
import { generateVerificationCode, sendVerificationCode } from "@/utils/server/sendVerificationCode"
import { NextResponse } from "next/server"

export const POST = async (req) => {

  if (!global.db) {
    await dbConnection()
    global.db = true
  }

  const body = await req.json()
  const { email, password, phone } = body

  if (!email || !password || !phone) return NextResponse.json({ message: "email, password and phone are required" }, { status: 400 })

  const emailReges = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/
  const phoneReges = /^0?9\d{7}$/

  let hasErrros = false
  const errors = {}

  if (!emailReges.test(email)) {
    errors.email = "email is not valid"
    hasErrros = true
  }

  if (!phoneReges.test(phone)) {
    errors.phone = "Phone is not valid"
    hasErrros = true
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

  const hashedPassword = await hashPassword(password)

  const verificationCode = generateVerificationCode()
  const res = await sendVerificationCode(phone, verificationCode)

  if (res.status !== 200) return NextResponse.json({ message: "Error sending verification code" }, { status: 500 })

  const newUser = new User({
    email,
    password: hashedPassword,
    phone,
    verificationCode,
    isVerified: false
  })

  try {
    await newUser.save()
  } catch (err) {
    return NextResponse.json({ message: "Error saving user" }, { status: 500 })
  }

  return NextResponse.json({
    user: {
      email,
      phone,
      isVerified: false
    }
  }, { status: 200 })
}