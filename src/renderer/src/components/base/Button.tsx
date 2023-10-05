import React from 'react'

interface IProps {
  onClick: () => void
  label?: string
  icon?: React.ReactElement<any, any>
  small?: boolean
}
const Button: React.FC<IProps> = ({ onClick, icon, label, small }): JSX.Element => {
  return (
    <button
      className={`flex justify-center items-center h-12 ${
        small ? 'w-12' : 'w-24'
      } rounded-lg bg-green-900/10 text-green-900 hover:bg-green-900/40 text-md`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  )
}

export default Button
