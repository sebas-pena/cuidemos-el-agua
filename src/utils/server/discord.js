import formData from "form-data"

export const uploadReport = async ({
  location,
  image,
  description,
  filename,
  contentType
}) => {
  let buffer = await image.arrayBuffer()
  buffer = Buffer.from(buffer)
  const form = new formData()
  const message = `**Nuevo Reporte**\n\n**Descripción:** ${description}\n**Latitud:** ${location.lat}\n**Longitud:** ${location.lng}`
  form.append("content", message)
  form.append("files[0]",
    buffer,
    {
      filename,
      contentType
    }
  )
  console.log(form)
  const req = fetch(`https://discord.com/api/v9/channels/${process.env.DISCORD_REPORTS_CHANNEL_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      ...form.getHeaders(),
    },
    body: form.getBuffer(),
  })
  return req
}