import VideoPlayerSkeleton from '@renderer/components/loading/VideoPlayerSkeleton'
import VideoPlayer from '@renderer/components/videoplayer/VideoPlayer'
import { useStepContext } from '@renderer/contexts/stepContext'
import useIpc from '@renderer/hooks/useIpc'

// TODO: Create smaller components for segements and player
const Editor = (): JSX.Element => {
  const { file } = useStepContext()
  // TODO: Handle this properly.
  if (!file) {
    return <div> Error Loading file</div>
  }
  const { loading, error, response } = useIpc('loadFile', file.path)

  if (error) return <div>There was error processing your file</div>

  return (
    <div className="flex-col">
      {loading ? <VideoPlayerSkeleton /> : <VideoPlayer path={file.path} segments={response} />}
    </div>
  )
}

export default Editor
