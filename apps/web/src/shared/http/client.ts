import axios, { type AxiosResponse } from 'axios'
import type { ApiSuccessResponse } from './types'
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
})

function unwrapResponse<T>(response: AxiosResponse<ApiSuccessResponse<T>>): AxiosResponse<T> {
  return {
    ...response,
    data: response.data.data,
  }
}

http.interceptors.response.use(
  unwrapResponse,
  (error: unknown) => {
    return Promise.reject(error)
  },
)

export default http
