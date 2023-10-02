import { useEffect, useState } from 'react'

export const useIpc = (functionName, args): Record<string, boolean | any | Error> => {
  const [loading, setLoading] = useState<boolean>(true)
  const [response, setResponse] = useState<Record<any, any>>({})
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
