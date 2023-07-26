import { useState } from 'react'
import type { ChangeEvent } from 'react'
import YoutubePlayer from './components/YoutubePlayer'
import { HiOutlineFolderArrowDown } from 'react-icons/hi2'

function App(): JSX.Element {
  const [file, setFile] = useState<File>()
  const [results, setResults] = useState<Record<string, string>>({})

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-full flex justify-center">
        <div className="flex items-center justify-center w-8/12 sm:w-7/12 sm:p-0 shadow-md">
          <label className="flex flex-col items-center justify-center w-full h-64 border-[1.6px] border-dashed rounded-lg cursor-pointer bg-storm hover:bg-storm-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <HiOutlineFolderArrowDown size={100} />
              <p className="mb-2 text-md ">
                <span className="font-semibold">Click to upload</span> or drag and drop a file
              </p>
              <p className="text-xs">MP4 or MOV</p>
            </div>
            <input type="file" className="hidden" onChange={(e) => handleFileChange(e)} />
          </label>
        </div>
      </div>
      {/* <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>

      <div>{results.text}</div>

      {file && <YoutubePlayer path={file.path} />} */}
    </div>
  )
}

export default App
