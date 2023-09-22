import StepConteroller from './components/StepConteroller'
import StepContext from './contexts/stepContext'

function App(): JSX.Element {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-white overflow-hidden">
      <StepContext>
        <StepConteroller />
      </StepContext>
    </div>
  )
}

export default App
