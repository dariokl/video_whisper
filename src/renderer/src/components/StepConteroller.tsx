import React, { useState } from 'react'
import FileInput from '../pages/FileInput'
import Editor from '../pages/Editor'
import { useStepContext } from '@renderer/contexts/stepContext'

const StepConteroller = (): JSX.Element | null => {
  const { step } = useStepContext()

  const stepRenderer = (): JSX.Element | null => {
    switch (step) {
      case 0:
        return <FileInput />
      case 1:
        return <Editor />
      default:
        return null
    }
  }
  return <>{stepRenderer()}</>
}

export default StepConteroller
