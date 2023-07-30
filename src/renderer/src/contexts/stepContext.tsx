import { createContext, useContext, useState } from 'react'

interface IProps {
  children: React.ReactNode
}
const StepContext = createContext({})

const StepContextProvider: React.FC<IProps> = ({ children }): JSX.Element => {
  const [step, setStep] = useState<number>(0)
  const [file, setFile] = useState<File | null>(null)

  return (
    <StepContext.Provider value={{ step, setStep, file, setFile }}>{children}</StepContext.Provider>
  )
}

export const useStepContext = (): {} => useContext(StepContext)

export default StepContextProvider
