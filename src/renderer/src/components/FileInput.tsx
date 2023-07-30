import { useState, useRef, useEffect, ChangeEvent } from 'react'
import { HiOutlineFolderArrowDown } from 'react-icons/hi2'
import { BsFiletypeMp4 } from 'react-icons/bs'
const FileInput = (): JSX.Element => {
  const [files, setFiles] = useState<File[]>([])
  const drop = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (drop.current) {
      drop.current.addEventListener('dragover', handleDragOver)
      drop.current.addEventListener('drop', handleDrop)
    }

    return () => {
      if (drop.current) {
        drop.current.removeEventListener('dragover', handleDragOver)
        drop.current.removeEventListener('drop', handleDrop)
      }
    }
  }, [])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file) setFiles((prev) => [...prev, file])
    }
  }

  const handleDragOver = (e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    const { files } = e.dataTransfer as DataTransfer

    const validFiles = Array.from(files).filter(({ type }) => type === 'video/mp4')

    if (validFiles.length > files.length) {
      // show message
    }

    if (files && files.length) {
      setFiles((prev) => [...prev, ...validFiles])
    }
  }

  return (
    <div className="bg-soft-gray shadow-lg w-6/12 h-96 flex-col rounded-lg">
      <div className="w-full flex justify-center">
        <div className="mt-8 flex items-center justify-center text-green-900" ref={drop}>
          <label className="flex flex-col items-center border-[1px] border-dotted border-green-900 bg-green-900/10 hover:bg-green-900/40  justify-center w-96 2xl:w-[680px] h-62 rounded-lg cursor-pointer transition duration-150">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <HiOutlineFolderArrowDown size={100} />
              <p className="mb-2 text-md ">
                <span className="font-semibold">Click to upload</span> or drag and drop a file
              </p>
              <p className="text-xs">MP4 or MOV</p>
            </div>
            <input type="file" className="hidden" onChange={(e): void => handleFileChange(e)} />
          </label>
        </div>
      </div>
      <div className="flex-col p-8">
        {files.map((file, index) => (
          <div
            className="flex gap-4 justify-center items-center text-xs text-green-900 hover:bg-green-900/10 rounded-lg"
            key={`${file}_${index}`}
          >
            <BsFiletypeMp4 size={40} />
            {file.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileInput
