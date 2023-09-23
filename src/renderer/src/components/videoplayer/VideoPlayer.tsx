import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { formatTime } from '@renderer/utils/format-time.util'
import { IoIosCheckbox, IoIosCheckboxOutline } from 'react-icons/io'
import Button from '../base/Button'

const VideoPlayer = ({ path, loading, segments }): JSX.Element => {
  const ref = useRef(null)

  const [selectedSegments, setSelectedSegments] = useState<Record<any, any>[]>([])

  const handleSegmentClick = (start: number): void => {
    if (ref.current) {
      ;(ref.current as ReactPlayer).seekTo(start, 'seconds')
    }
  }

  const isSelectedSegment = (selectedId: number): Record<string, number | string> | undefined =>
    selectedSegments.find(({ id }) => id === selectedId)

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
    <div className="flex-col pt-8">
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

      <div className="mt-8 flex-col h-[600px] overflow-y-scroll p-6 lg:p-0">
        {loading ? (
          <div> Loading... </div>
        ) : (
          segments.map(({ id, text, start, end }) => {
            return (
              <div key={id} className="flex-col p-[4px]">
                <div className="flex justify-center items-center shadow-md bg-green-900/10">
                  <div
                    onClick={(): void => handleSegmentClick(start)}
                    className="w-fit h-10 flex justify-center items-center p-4 text-green-900 hover:text-blue-400 font-bold transition duration-150 hover:cursor-pointer"
                  >
                    <p>{formatTime(start)}</p>
                  </div>
                  <div className="flex-1 p-2 justify-center text-green-900/90">
                    <div className="flex justify-between items-center">
                      <p className="text-bold">{text}</p>
                      {isSelectedSegment(id) ? (
                        <IoIosCheckbox size={24} onClick={(): void => onRemoveSegment(id)} />
                      ) : (
                        <IoIosCheckboxOutline
                          size={22}
                          onClick={(): void => onAddSegment({ id, text, start, end })}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
      <div className="flex justify-end mt-2 md:mt-4 mb-4 mr-10 md:mr-0">
        <Button onClick={generateVideo} label="Create" />
      </div>
    </div>
  )
}

export default VideoPlayer
