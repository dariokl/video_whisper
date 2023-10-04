import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import Button from '../base/Button'
import Segment from './Segment'
import VideoPlayerSkeleton from '../loading/VideoPlayerSkeleton'
const VideoPlayer = ({ path, loading, segments }): JSX.Element => {
  const ref = useRef(null)

  const [selectedSegments, setSelectedSegments] = useState<Record<any, any>[]>([])

  const handleSegmentClick = (start: number): void => {
    if (ref.current) {
      ;(ref.current as ReactPlayer).seekTo(start, 'seconds')
    }
  }

  const isSelectedSegment = (selectedId: number): boolean =>
    !!selectedSegments.find(({ id }) => id === selectedId)

  const onAddSegment = (segment: Record<string, number | string>): void => {
    setSelectedSegments((prev) => [...prev, segment])
  }

  const onRemoveSegment = (selectedId: number): void => {
    const filteredSegments = selectedSegments.filter(({ id }) => id !== selectedId)

    setSelectedSegments(filteredSegments)
  }

  // Consider creating lazy UseIpc hook.
  const generateVideo = async (): Promise<void> => {
    // @ts-ignore - window is undefined
    await window.api.generateVideo(path, selectedSegments)
  }

  return (
    <div className="flex-col">
      <div className="rounded-lg flex justify-center">
        <ReactPlayer
          ref={ref}
          url={`file-protocol://${path}`}
          controls
          style={{
            borderRadius: '20px',
            overflow: 'hidden'
          }}
          autoPlay
        />
      </div>

      <div className="mt-8 h-[240px] md:h-[400px] lg:h-[600px] max-w overflow-y-scroll p-6 lg:p-0">
        {loading ? (
          <VideoPlayerSkeleton />
        ) : (
          segments.map(({ id, text, start, end }) => {
            return (
              <Segment
                key={id}
                id={id}
                text={text}
                start={start}
                end={end}
                isSelected={isSelectedSegment(id)}
                onSegmentClick={handleSegmentClick}
                onAddSegment={onAddSegment}
                onRemoveSegment={onRemoveSegment}
              />
            )
          })
        )}
      </div>
      <div className="flex justify-end mt-2 md:mt-4 mb-4 mr-8 md:mr-8 lg:mr-2">
        <Button onClick={generateVideo} label="Create" />
      </div>
    </div>
  )
}

export default VideoPlayer
