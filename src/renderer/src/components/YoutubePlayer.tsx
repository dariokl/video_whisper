const YoutubePlayer = ({ path }: { path: string }): JSX.Element => {
  return (
    <video
      controls
      autoPlay
      width="100%"
      className="videoPlayer"
      src={`file-protocol://${path}`}
    ></video>
  )
}

export default YoutubePlayer
