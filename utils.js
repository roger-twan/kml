function formatDateTime(dateTime) {
  const offset = dateTime.getTimezoneOffset()
  const localDateTime = new Date(dateTime.getTime() - (offset*60*1000))
  return localDateTime.toISOString().replace('T', ' ').substring(0, 19)
}

export {
  formatDateTime
}
