// import React, { useState } from 'react'

// export const useIpc = async (functionName, args) => {
//   const [loading, setLoading] = useState<boolean>(false)
//   const [response, setResponse] = useState<Record<any, any>>({})
//   const [error, setError] = useState<Error | null>(null)

//   try {
//     setLoading(true)

//     const response = await window.api[functionName](args)

//     console.log('here')
//     setResponse(response)
//   } catch (error) {
//     setError(error as Error)
//   } finally {
//     setLoading(false)
//   }

//   return { loading, response, error }
// }

// export default useIpc
