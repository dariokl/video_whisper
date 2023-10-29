import React from 'react'
import type { ISegment } from '@renderer/hooks/useIpc'
import { useStepContext } from '@renderer/contexts/stepContext'
import Button from '@renderer/components/base/Button'
import { IoIosArrowBack } from 'react-icons/io'

interface IProps {
  segments: ISegment[]
  generateVideo: () => void
  searchTerm: string
}

const TextView: React.FC<IProps> = ({ searchTerm, segments, generateVideo }) => {
  const { setStep } = useStepContext()

  // TODO: Change the type.
  const higlightText = (): any => {
    const text = segments.map(({ text }) => text).join('')

    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, 'gi')

    // Split the text into an array of parts (matching and non-matching).
    const parts = text.split(regex)

    return parts.map((part, index) => {
      if (part.match(regex)) {
        // If the part matches the search term, wrap it in a <mark> tag.
        return (
          <mark className="bg-green-400/50" key={index}>
            {part}
          </mark>
        )
      } else {
        return part
      }
    })
  }

  return (
    <>
      <div className="text-center rounded-lg overflow-y-scroll h-fit max-h-[620px] overflow-y-scroll">
        <p className="bg-green-900/10 shadow-lg p-4 break-words text-green-900">{higlightText()}</p>
      </div>
      <div className="flex justify-between mt-2 md:mt-4 mb-4 md:mr-2 lg:mr-2">
        <Button onClick={(): void => setStep(0)} icon={<IoIosArrowBack />} />
        <Button onClick={generateVideo} label="Export" />
      </div>
    </>
  )
}

export default TextView
