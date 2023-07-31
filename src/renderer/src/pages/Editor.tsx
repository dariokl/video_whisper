import React from 'react'

import { useStepContext } from '@renderer/contexts/stepContext'
import useIpc from '@renderer/hooks/useIpc'

const Editor = (): JSX.Element => {
  const { files, setStep } = useStepContext()
  const { loading, error, response } = useIpc('loadFile', files[0].path)

  if (loading) return <div>Loading...</div>
  if (error) return <div>There was error processing your file</div>

  return (
    <div className="flex-col">
      <div onClick={(): void => setStep(0)}>back</div>
      <div className="flex-col h-96 overflow-scroll">
        {response.segments.map(({ text, start, end }) => {
          return (
            <div key={start} className="flex-col p-[2px]">
              <div className="flex p-2 bg-green-900/10 h-10 rounded-lg text-green-900 items-center">
                <p className="p-4 text-bold">{text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Editor
