import StepConteroller from './components/StepConteroller'
import StepContext from './contexts/stepContext'

function App(): JSX.Element {
  return (
    <div className="container mx-auto flex items-center justify-center bg-white mt-2 min-h-screen">
      <StepContext>
        <StepConteroller />
      </StepContext>
    </div>
  )
}

export default App
