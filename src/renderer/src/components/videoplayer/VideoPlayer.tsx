import { useRef } from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ path, loading, segments }): JSX.Element => {
  const ref = useRef(null)

  const handleSegmentClick = (start, end): void => {
    if (ref.current) {
      ;(ref.current as ReactPlayer).seekTo(start, 'seconds')
    }
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
              <div
                key={start}
                className="flex-col p-[2px]"
                onClick={(): void => handleSegmentClick(start, end)}
              >
                <div className="flex p-2 bg-green-900/10 h-10 rounded-lg text-green-900 items-center">
                  <p className="p-4 text-bold">{text}</p>
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
