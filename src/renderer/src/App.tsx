import { useState } from 'react'
import type { ChangeEvent } from 'react'
import YoutubePlayer from './components/YoutubePlayer'

function App(): JSX.Element {
  const [file, setFile] = useState<File>()
  const [results, setResults] = useState<Record<string, string>>({})

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadClick = async (): Promise<any> => {
    if (!file) {
      return
    }

    // @ts-ignore-next-line
    const result = await window.api.test(file.path)

    setResults(result)
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>

      <div>{results.text}</div>

      {file && <YoutubePlayer path={file.path} />}
    </div>
  )
}

export default App
