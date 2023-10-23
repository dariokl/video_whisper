import React from 'react'

interface IProps {
  options: Record<string, string>[]
  label: string
}

const Select: React.FC<IProps> = ({ options, label }) => {
  return (
    <div className="flex-col w-32">
      <label className="block mb-2 text-xs font-bold text-green-900 ml-4">{label}</label>
      <select className="bg-transparent border border-green-900 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-900 block w-full p-2.5 ">
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
