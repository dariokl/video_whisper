import React from 'react'
import type { ISegment } from '@renderer/hooks/useIpc'

interface IProps {
  segments: ISegment[]
}

const TextView: React.FC<IProps> = ({ segments }) => {
  return <div>TextView</div>
}

export default TextView
