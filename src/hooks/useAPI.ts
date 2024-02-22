import { HttpMethods, instance } from '@/libs/axios'
import { useEffect, useState } from '@/libs/vtu/valueToUI'
import { AxiosRequestConfig } from 'axios'

export const useAPI = <T>(
  method: HttpMethods,
  url: string,
  options?: AxiosRequestConfig,
) => {
  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      instance<T>({ method, url, ...options })
        .then((response) => {
          if (response.status >= 400) {
            setIsError(true)
            setIsLoading(false)
            return
          }
          setData(response.data)
          setIsLoading(false)
        })
        .catch(() => {
          throw Error()
        })
    } catch {
      setIsError(true)
      setIsLoading(false)
    }
  }, [url, options])

  return { data, isLoading, isError }
}
