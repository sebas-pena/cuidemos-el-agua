import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export const createToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '30d' })
}

export const verifyToken = (token) => {
  return jwt.verify(token, secret)
}