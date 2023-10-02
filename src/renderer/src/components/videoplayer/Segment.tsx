import React from 'react'
import { IoIosCheckbox, IoIosCheckboxOutline } from 'react-icons/io'
import { formatTime } from '@renderer/utils/format-time.util'
interface IProps {
  id: number
  text: string
  start: number
  end: number
  isSelected: boolean
  onSegmentClick: (start: number) => void
  onAddSegment: (segment: Record<string, number | string>) => void
  onRemoveSegment: (selectedId: number) => void
}

const Segment: React.FC<IProps> = ({
  id,
  text,
  start,
  end,
  isSelected,
  onSegmentClick,
  onAddSegment,
  onRemoveSegment
}) => {
  return (
    <div key={id} className="flex-col p-[4px]">
      <div className="flex justify-center items-center shadow-md bg-green-900/10">
        <div
          onClick={(): void => onSegmentClick(start)}
          className="w-fit h-10 flex justify-center items-center p-4 text-green-900 hover:text-blue-400 font-bold transition duration-150 hover:cursor-pointer"
        >
          <p>{formatTime(start)}</p>
        </div>
        <div className="flex-1 p-2 justify-center text-green-900/90">
          <div className="flex justify-between items-center">
            <p className="text-bold">{text}</p>
            <div>
              {isSelected ? (
                <IoIosCheckbox size={24} onClick={(): void => onRemoveSegment(id)} />
              ) : (
                <IoIosCheckboxOutline
                  size={24}
                  onClick={(): void => onAddSegment({ id, text, start, end })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Segment
