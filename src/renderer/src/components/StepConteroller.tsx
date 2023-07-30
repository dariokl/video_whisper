import React, { useState } from 'react'
import FileInput from './FileInput'
import { useStepContext } from '@renderer/contexts/stepContext'

const StepConteroller = (): JSX.Element | null => {
  const { step } = useStepContext()

  const stepRenderer = (): JSX.Element | null => {
    switch (step) {
      case 0:
        return <FileInput />
      default:
        return null
    }
  }
  return <>{stepRenderer()}</>
}

export default StepConteroller
