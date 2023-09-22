import VideoPlayer from '@renderer/components/videoplayer/VideoPlayer'
import { useStepContext } from '@renderer/contexts/stepContext'
import useIpc from '@renderer/hooks/useIpc'

// TODO: Create smaller components for segements and player
const Editor = (): JSX.Element => {
  const { files } = useStepContext()
  const { loading, error, response } = useIpc('loadFile', files[0].path)

  if (error) return <div>There was error processing your file</div>

  return (
    <div className="flex-col">
      <VideoPlayer path={files[0].path} loading={loading} segments={response} />
    </div>
  )
}

export default Editor
