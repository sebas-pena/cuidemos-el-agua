const secret = process.env.WHATSAPP_API_SECRET

export const sendVerificationCode = async (phone, verificationCode) => {
  return fetch(
    `https://cuidemos-el-agua-whatsapp-api.onrender.com/send-verification-code?secret=${secret}&number=598${phone}&code=${verificationCode}`,
    {
      method: "POST"
    })
}

export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}