import { useStepContext } from '@renderer/contexts/stepContext'
import { ChangeEvent, useEffect, useRef } from 'react'
import { BsFiletypeMp4 } from 'react-icons/bs'
import { HiOutlineFolderArrowDown } from 'react-icons/hi2'
import { IoIosArrowForward } from 'react-icons/io'
import Button from '../components/base/Button'

const FileInput = (): JSX.Element => {
  const { setStep, file, setFile } = useStepContext()

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
      const selectedFile = e.target.files[0]
      if (selectedFile) {
        if (selectedFile.size <= 100 * 1024 * 1024 && selectedFile.type === 'video/mp4') {
          setFile(selectedFile)
        } else {
          // Show an error message for invalid files
        }
      }
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

    if (files && files.length === 1) {
      const droppedFile = files[0]
      if (droppedFile.size <= 100 * 1024 * 1024 && droppedFile.type === 'video/mp4') {
        setFile(droppedFile)
      } else {
        // Show an error message for invalid files
      }
    }
  }

  const handleContinue = (): void => {
    if (file) {
      setStep(1)
    }
  }

  return (
    <div className="p-2 bg-gradient-to-t from-soft-gray from-40% via-soft-gray via-55% to-green-900/30 to-90% shadow-lg w-10/12 h-fit flex-col rounded-lg">
      <div className="flex justify-center">
        <div className="mt-14 flex items-center justify-center text-green-900" ref={drop}>
          <label className="flex flex-col items-center border-[1px]  border-dotted border-green-900 bg-green-900/10 hover:bg-green-900/40  justify-center w-[480px] lg:w-[620px] h-62 rounded-lg cursor-pointer transition duration-150">
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
        {file && (
          <div
            className="flex gap-4 p-4 justify-center items-center text-xs text-green-900 hover:bg-green-900/10 rounded-lg"
            key={`${file}`}
          >
            <BsFiletypeMp4 size={40} />
            {file.name}
          </div>
        )}
      </div>
      <div className="flex justify-end pr-4">
        <Button onClick={handleContinue} icon={<IoIosArrowForward />} />
      </div>
    </div>
  )
}

export default FileInput
