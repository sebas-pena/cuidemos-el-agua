export const locate = async (lat, lng) => {
  const res = await fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`)
  if (res.ok) {
    const data = await res.json()
    return {
      suburb: data.address.suburb,
      state: data.address.state,
      city: data.address.city,
    }
  } else {
    throw new Error("Failed to fetch location")
  }
}