import { useEffect, useState } from 'react'

export interface ISegment {
  id: number
  start: number
  end: number
  text: string
}

export const useIpc = (functionName, args): Record<string, boolean | any | Error> => {
  const [loading, setLoading] = useState<boolean>(true)
  const [response, setResponse] = useState<ISegment[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const result = async (): Promise<void> => {
      try {
        // @ts-ignore - window is undefined
        const response = await window.api[functionName](args)
        setResponse(response)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }
    result()
  }, [])

  return { loading, response, error }
}

export default useIpc
