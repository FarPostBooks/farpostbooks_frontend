export function toLocaleDateTime(datetime: string) {
  const date = new Date(datetime)

  return `${date.toLocaleString('ru-Ru')}`
}
