import http from '@/shared/http/client'
import type { ProductItem } from '../types'
import type { CursorPage, CursorQuery } from '@/shared/api/pagination'

export function getHomeProducts(params: CursorQuery) {
  return http.get<CursorPage<ProductItem>>('/home/products', {
    params,
  })
}
