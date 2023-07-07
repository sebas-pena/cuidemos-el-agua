const getMontevideoMidnight = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  const midnightUTC = +date + date.getTimezoneOffset() * 60 * 1000
  return midnightUTC - 3 * 60 * 60 * 1000
}

const getMontevideoWeekAgo = () => {
  const midnightMontevideo = getMontevideoMidnight()
  const dates = []
  for (let i = 0; i < 7; i++) {
    dates.push(midnightMontevideo - i * 24 * 60 * 60 * 1000)
  }
  return dates
}