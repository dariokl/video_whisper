import { useRef } from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ path }): JSX.Element => {
  const ref = useRef(null)
  return (
    <ReactPlayer
      ref={ref}
      url={`file-protocol://${path}`}
      width="100%"
      height="100%"
      controls={true}
    />
  )
}

export default VideoPlayer
