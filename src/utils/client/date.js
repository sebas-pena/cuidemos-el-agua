export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();

  const diffMilliseconds = now - date;
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return `Hace un momento.`;
  } else if (diffMinutes < 60) {
    return `Hace ${diffMinutes} minutos.`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours} horas.`;
  } else {
    return `Hace ${diffDays} días.`;
  }
}