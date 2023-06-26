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

  let hasErrors = false
  const errors = {}

  if (!emailRegex.test(email)) {
    errors.email = "email is not valid"
    hasErrors = true
  }

  if (!phoneRegex.test(phone)) {
    errors.phone = "Phone is not valid"
    hasErrors = true
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters"
    hasErrors = true
  }

  if (hasErrors) return NextResponse.json({ errors, message: "Invalid values" }, { status: 400 })

  if (phone.toString().startsWith("0")) {
    phone = phone.toString().substring(1)
  }

  const usersWithSameCredentials = await User.find({
    '$or': [{ email: email }, { phone: phone }]
  })
  let isEmailTaken = false
  usersWithSameCredentials.forEach(user => {
    if (user.email === email && user.emailVerified) {
      errors.email = "email already taken "
      isEmailTaken = true
      hasErrors = true
    }
    if (user.phone === phone && user.phoneVerified) {
      errors.phone = "phone already taken "
      hasErrors = true
    }
  })

  if (hasErrors) return NextResponse.json({ errors, message: "Invalid values" }, { status: 400 })

  const token = createToken({ email })

  try {
    await sendVerificationMail(email, token)
  } catch (e) {
    return NextResponse.json({ message: "Error sending verification email" }, { status: 500 })
  }

  const hashedPassword = await hashPassword(password)
  try {
    const user = {
      email,
      password: hashedPassword,
      phone: phone,
      phoneVerified: false,
      emailVerified: false
    }

    if (isEmailTaken) {
      User.findOneAndUpdate(user)
    } else {
      await User.create(user)
    }

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