// TODO: Needs more work , store VTT file and load it back to player.

// const srtContent = (segments) =>
//   segments
//     .map((segment) => {
//       const startTime = `00:00:${segment.start},000`
//       const endTime = `00:00:${segment.end},000`
//       const text = segment.text
//       const segmentId = segment.id + 1
//       return `${segmentId}\n${startTime} --> ${endTime}\n${text.trim()}\n\n`
//     })
//     .join('')

// // Create a Blob for the SRT content
// const srtBlob = new Blob([srtContent], { type: 'text/vtt' })

// // Create a data URL for the Blob
// const srtDataUrl = URL.createObjectURL(srtBlob)

// const videoSubtitles = [
//   {
//     kind: 'subtitles',
//     src: srtDataUrl,
//     srcLang: 'en',
//     label: 'English',
//     default: true
//   }
// ]
