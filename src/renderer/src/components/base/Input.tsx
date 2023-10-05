import React from 'react'

interface IProps {
  type: string
  placeholder: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input: React.FC<IProps> = ({ type, placeholder, onChange }): JSX.Element => {
  return (
    <input
      onChange={onChange}
      type={type}
      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-green-900 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:text-neutral-700 focus:border-[2px] focus:border-green-900"
      placeholder={placeholder}
    />
  )
}

export default Input
