import React from 'react'
import { IoIosList } from 'react-icons/io'
import { RiFilePaper2Line } from 'react-icons/ri'
import Input from '../base/Input'
import Button from '../base/Button'

interface IProps {
  onSearchChange: (term: string) => void
}

const SearchAndView: React.FC<IProps> = ({ onSearchChange }): JSX.Element => {
  return (
    <div className="flex justify-between items-center mt-4 mb-4 h-12 max-w">
      <div className="flex w-[240px] flex-wrap items-center">
        <Input
          type="input"
          placeholder="Search for word or phrase..."
          onChange={({ target: { value } }): void => onSearchChange(value)}
        />
      </div>
      <div className="flex gap-2">
        <Button icon={<IoIosList size={22} />} onClick={(): void => console.log('click')} small />
        <Button
          icon={<RiFilePaper2Line size={22} />}
          onClick={(): void => console.log('click')}
          small
        ></Button>
      </div>
    </div>
  )
}

export default SearchAndView
