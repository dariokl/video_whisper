import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import Button from '../base/Button'
import Segment from './Segment'
import SearchAndView from './SearchAndView'

const VideoPlayer = ({ path, segments }): JSX.Element => {
  const ref = useRef(null)
  const [stateSegments, setStateSegments] = useState<Record<any, any>[]>(segments)

  const handleSegmentClick = (start: number): void => {
    if (ref.current) {
      ;(ref.current as ReactPlayer).seekTo(start, 'seconds')
    }
  }

  const onAddSegment = (segment: Record<string, number | string>): void => {
    setStateSegments((prev) =>
      prev.map(({ id, ...rest }) =>
        id === segment.id ? { ...segment, checked: true } : { id, ...rest }
      )
    )
  }

  const onRemoveSegment = (segment: Record<string, number | string>): void => {
    setStateSegments((prev) =>
      prev.map(({ id, ...rest }) =>
        id === segment.id ? { ...segment, checked: false } : { id, ...rest }
      )
    )
  }

  const handleSearchChange = (term: string): void => {
    if (!term) {
      setStateSegments(segments)
    }
    const filteredSegments = segments.filter(({ text }) => text.includes(term))
    setStateSegments(filteredSegments)
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
      <SearchAndView onSearchChange={handleSearchChange} />
      <div className="h-[240px] md:h-[400px] lg:h-[600px] max-w overflow-y-scroll ">
        {stateSegments.map(({ id, text, start, end, checked }) => {
          return (
            <Segment
              key={id}
              id={id}
              text={text}
              start={start}
              end={end}
              checked={checked}
              onSegmentClick={handleSegmentClick}
              onAddSegment={onAddSegment}
              onRemoveSegment={onRemoveSegment}
            />
          )
        })}
      </div>
      <div className="flex justify-end mt-2 md:mt-4 mb-4 mr-8 md:mr-8 lg:mr-2">
        <Button onClick={generateVideo} label="Create" />
      </div>
    </div>
  )
}

export default VideoPlayer
