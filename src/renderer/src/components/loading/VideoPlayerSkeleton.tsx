const VideoPlayerSkeleton = (): JSX.Element => {
  return (
    <div className="flex-col p-[4px] divide-y-4 divide-white">
      {Array.from({ length: 12 }, (_, index) => {
        return (
          <div key={index} className="flex items-center justify-between h-12 p-4 bg-green-900/10 ">
            <div className="flex-col justify-between">
              <div className="h-2.5 bg-green-900 rounded-full w-48 animate-pulse"></div>
              {index % 3 === 0 && (
                <div className="h-2.5 bg-green-900 rounded-full w-12 animate-pulse mt-2"></div>
              )}
            </div>
            <div className="h-2.5 bg-green-900 w-4 h-4 animate-pulse"></div>
          </div>
        )
      })}
    </div>
  )
}

export default VideoPlayerSkeleton
