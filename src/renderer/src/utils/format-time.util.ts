export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  const formattedHours = hours > 0 ? (hours < 10 ? '0' : '') + hours + ':' : ''
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes
  const formattedSeconds = (remainingSeconds < 10 ? '0' : '') + remainingSeconds

  return formattedHours + formattedMinutes + ':' + formattedSeconds
}
