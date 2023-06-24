import nodemailer from 'nodemailer';
import verificationEmail from "../../mails/verification-email.js"

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_SECURE_PASS,
  },
});

export const sendVerificationMail = (email, token) => (
  transporter.sendMail({
    from: `Cuidemos el Agua <${process.env.GOOGLE_MAIL}> `,
    to: email,
    subject: "Cuidemos el Agua: Verifica tu email",
    text: `Bienvenida/o a Cuidemos el Agua!
    Para completar el proceso de registro, necesitamos que confirmes tu dirección de correo electrónico haciendo clic en el botón de confirmación que aparece a continuación.
    Activar cuenta ${process.env.BASE_URL}/auth/confirm-mail/${token}
    `,
    html: verificationEmail.replace("{{URL}}", `${process.env.BASE_URL}/auth/confirm/${token}`)
  })
)