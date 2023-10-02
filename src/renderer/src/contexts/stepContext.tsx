import { createContext, useContext, useState } from 'react'

interface IProps {
  children: React.ReactNode
}

interface IContext {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}
const StepContext = createContext({} as IContext)

const StepContextProvider: React.FC<IProps> = ({ children }): JSX.Element => {
  const [step, setStep] = useState<number>(0)
  const [file, setFile] = useState<File | null>(null)

  return (
    <StepContext.Provider value={{ step, setStep, file, setFile }}>
      <div className="w-[920px] flex justify-center">{children}</div>
    </StepContext.Provider>
  )
}

export const useStepContext = (): IContext => useContext(StepContext)

export default StepContextProvider
