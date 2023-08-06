import { useStepContext } from '@renderer/contexts/stepContext'
import Editor from '../pages/Editor'
import FileInput from '../pages/FileInput'

const StepConteroller = (): JSX.Element | null => {
  const { step } = useStepContext()

  const stepRenderer = (): JSX.Element | null => {
    switch (step) {
      case 0:
        return <FileInput />
      case 1:
        return <Editor />
      default:
        return null
    }
  }
  return <>{stepRenderer()}</>
}

export default StepConteroller
