import VideoPlayerSkeleton from '@renderer/components/loading/VideoPlayerSkeleton'
import VideoPlayer from '@renderer/components/videoplayer/VideoPlayer'
import { useStepContext } from '@renderer/contexts/stepContext'
import useIpc from '@renderer/hooks/useIpc'

// TODO: Create smaller components for segements and player
const Editor = (): JSX.Element => {
  const { file, model } = useStepContext()
  // TODO: Handle this properly.
  if (!file) {
    return <div> File not loaded</div>
  }
  const { loading, error, response } = useIpc('loadFile', { path: file.path, model })

  if (error) return <div>There was error processing your file</div>

  return (
    <div className="">
      {loading ? <VideoPlayerSkeleton /> : <VideoPlayer path={file.path} segments={response} />}
    </div>
  )
}

export default Editor
