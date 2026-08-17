
import {client} from "@/shared/api/client.ts";
import type {CursorQuery} from "@/shared/api/pagination.ts";

/**
 * axios写法
 */
// import http from '@/shared/http/client'
// import type { ProductItem } from '../types'
// import type { CursorPage, CursorQuery } from '@/shared/api/pagination'

// export function getHomeProducts(params: CursorQuery) {
//   return http.get<CursorPage<ProductItem>>('/home/products', {
//     params,
//   })
// }

export async function getHomeProducts(params: CursorQuery) {

  // 对应后端：
  // /api/home
  //   +
  // /products
  //
  // 所以 RPC 路径就是：
  // client.api.home.products
  const response = await client.api.home.products.$get({
    query: {
      ...(params.cursor !== undefined
        ? {
          cursor: String(params.cursor),
        }
        : {}),

      limit: String(params.limit),
    },
  })


  // Hono client 返回的是标准 Fetch Response。
  // 请求失败时主动抛错，让 HomeView 的 catch 接住。
  if (!response.ok) {
    throw new Error(`商品请求失败：${response.status}`)
  }

  // response.json() 的返回类型会根据后端 c.json(...)
  // 自动推导。
  //
  // 不需要再手写：
  // CursorPage<ProductItem>
  return response.json()
}
