import { createContext, useContext, useState } from 'react'

interface IProps {
  children: React.ReactNode
}

interface IContext {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}
const StepContext = createContext({} as IContext)

const StepContextProvider: React.FC<IProps> = ({ children }): JSX.Element => {
  const [step, setStep] = useState<number>(0)
  const [files, setFiles] = useState<File[]>([])

  return (
    <StepContext.Provider value={{ step, setStep, files, setFiles }}>
      <div className="w-[920px] flex justify-center">{children}</div>
    </StepContext.Provider>
  )
}

export const useStepContext = (): IContext => useContext(StepContext)

export default StepContextProvider
