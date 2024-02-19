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
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      instance<T>({ method, url, ...options }).then((response) => {
        setIsLoading(false)
        if (response.status >= 400) {
          return
        }
        setData(response.data)
        setIsSuccess(true)
      })
    } catch {
      setIsLoading(false)
    }
  }, [url, options])

  return { data, isLoading, isSuccess }
}
