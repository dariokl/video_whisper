import React from 'react'
import { IconType } from 'react-icons'

interface IProps {
  onClick: () => void
  label?: string
  icon?: React.ReactElement<any, any>
}
const Button: React.FC<IProps> = ({ onClick, icon, label }): JSX.Element => {
  return (
    <button
      className="flex justify-center items-center h-12 w-24 rounded-lg bg-green-900/10 text-green-900 hover:bg-green-900/40 text-md "
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  )
}

export default Button
