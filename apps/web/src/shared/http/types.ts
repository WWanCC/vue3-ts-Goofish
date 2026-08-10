export interface ApiSuccessResponse<T> {
  data: T
}

export interface ApiErrorResponse {
  code: string
  message: string
  details?: unknown
}
