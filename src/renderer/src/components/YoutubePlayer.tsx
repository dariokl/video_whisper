const YoutubePlayer = ({ path }: { path: string }): JSX.Element => {
  return (
    <div className="video-responsive">
      <video
        controls
        autoPlay
        width="100%"
        className="videoPlayer"
        src={`file-protocol://${path}`}
        
      ></video>
    </div>
  )
}

export default YoutubePlayer
