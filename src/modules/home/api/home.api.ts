import http from '@/shared/http/client'
import type { ProductItem } from '../types'

export function getHomeProducts() {
  return http.get<ProductItem[]>('/home/products')
}
