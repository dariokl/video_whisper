import { useRef } from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ path, loading, segments }): JSX.Element => {
  const ref = useRef(null)

  const handleSegmentClick = (start, end): void => {
    if (ref.current) {
      ;(ref.current as ReactPlayer).seekTo(start, 'seconds')
    }
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    const formattedHours = hours > 0 ? (hours < 10 ? '0' : '') + hours + ':' : ''
    const formattedMinutes = (minutes < 10 ? '0' : '') + minutes
    const formattedSeconds = (remainingSeconds < 10 ? '0' : '') + remainingSeconds

    return formattedHours + formattedMinutes + ':' + formattedSeconds
  }

  return (
    <div className="flex-col">
      <ReactPlayer
        ref={ref}
        url={`file-protocol://${path}`}
        width="100%"
        height="100%"
        controls={true}
      />
      <div className="flex-col h-96 overflow-scroll">
        {loading ? (
          <div> Loading... </div>
        ) : (
          segments.map(({ text, start, end }) => {
            return (
              <div key={start} className="flex-col p-[4px]">
                <div className="flex justify-center items-center shadow-md">
                  <div
                    onClick={(): void => handleSegmentClick(start, end)}
                    className="w-fit h-10 bg-green-900/10  flex justify-center items-center p-4 text-green-900 hover:text-blue-400 font-bold transition duration-150 hover:cursor-pointer"
                  >
                    <p>{formatTime(start)}</p>
                  </div>
                  <div className="flex-1 p-2 bg-green-900/10 justify-center text-green-900/90">
                    <p className="text-bold">{text}</p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
