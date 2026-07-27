import http from '@/shared/http/client'
import type { ApiSuccessResponse } from '@/shared/http/types'
import type { ProductItem } from '../types'

export function getHomeProducts() {
  return http.get<ApiSuccessResponse<ProductItem[]>>('/home/products')
}
